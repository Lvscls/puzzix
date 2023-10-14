const http = require('http');
const readline = require('readline');
const sendImage = require('./services/sendImage');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question('Entrez le nom de l\'image à envoyer: ', (imageToSend) => {
    imageToSend = imageToSend.trim();

    if (imageToSend) {
      const steps = {
        blur: 5,
        mirror: false,
        coloration: 'sepia',
      }
      sendImage.send(imageToSend, steps);
      rl.close();
    } else {
      console.log('Nom d\'image non valide. Veuillez entrer un nom d\'image.');
      rl.close();
    }
  });
}

askQuestion();
