var http = require('http');
const ImageStock = require('./services/stockImages');
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/images') {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const stock = new ImageStock();
      const parsedBody = JSON.parse(body);

      result = stock.stock(parsedBody)
      res.end(JSON.stringify(result));
    });
  } else if (req.method === 'GET' && req.url === '/image') {
    fs.readFile('./images/images.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Une erreur est survenue lors de la lecture du fichier JSON.');
      } else {
        try {
          const jsonArray = JSON.parse(data);
          if (Array.isArray(jsonArray) && jsonArray.length > 0) {
            const image = jsonArray[jsonArray.length - 1].toString();
            res.end(image)
          } else {
            console.error('Le fichier JSON ne contient pas de tableau valide ou il est vide.');
          }
        } catch (error) {
          console.error('Erreur lors de l\'analyse du fichier JSON :', error);
        }
      }
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});
server.listen(4000, () => {
  console.log('Serveur en cours d\'écoute sur le port 4000');
});