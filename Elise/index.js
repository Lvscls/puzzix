const transformImage = require('./services/transformImage')
var http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/effect") {
    let body = "";

    req.on("data", (data) => {
      body += data;
/*       console.log(body) */
    });

   

    req.on("end", () => {
      const bodysplit = body.split(",")
      console.log(bodysplit)
      const effect = new transformImage();
      result = effect.applyEffect(bodysplit[0],bodysplit[1])
      .then(result => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      })
      .catch(error => {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "An error occurred" }));
      });
    });
  } else {
    res.end("Bonjour");
  }
});

server.listen(4002, () => {
  console.log("Serveur en cours d'écoute sur le port 4002");
});
