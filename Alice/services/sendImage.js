class sendImage {
  static async send(imageString, steps) {
    try {
      const postData = {
        image: imageString,
        steps: steps
      };

      const response = await fetch('http://localhost:8080/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log('L\'image et les étapes ont été envoyées avec succès.');
      } else {
        console.error('Une erreur est survenue lors de l\'envoi de l\'image et des données.');
      }
    } catch (error) {
      console.error('Une erreur inattendue est survenue :', error);
    }
  }
}


module.exports = sendImage
