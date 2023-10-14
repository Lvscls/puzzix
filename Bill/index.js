const http = require("http");
const postData = require("./services/postData");
const OriginImage = require("./services/getOriginImage");
const TransformImage = require("./services/transformImage");

const server = http.createServer((req, res) => {
  var steps = {};
  if (req.method === "POST" && req.url === "/store") {
    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      const post = new postData();
      const parsedBody = JSON.parse(body);
      const result = [];
      post.stockImage(parsedBody.image);
      post.saveStepsinFile(parsedBody.steps);
      res.end(JSON.stringify(result));
    });
  } else if (req.method === "GET" && req.url === "/altered-image") {
    const originImage = new OriginImage();
    const transformImage = new TransformImage();
    const imageData = originImage.getImage()
    .then(imageData => {
      steps = transformImage.getStepsinFile();
      result = transformImage.sequencage(imageData, steps).then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      });
    })
    .catch(error => {
      res.statusCode = 500; 
      res.end("Internal Server Error");
    });
  } else {
    res.end("Bill");s
  }
});

server.listen(8080, () => {
  console.log("Serveur en cours d'écoute sur le port 8080");
});
