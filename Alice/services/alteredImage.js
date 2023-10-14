async function getAlteredImage() {
  try {
    const response = await fetch('http://localhost:8080/altered-image');

    if (response.ok) {
      const imageData = await response.json();
      return imageData;
    } else {
      console.error('Réponse HTTP non OK :', response.status, response.statusText);
      return null; 
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération de l\'image :', error);
    return null;
  }
}

getAlteredImage()
  .then((imageData) => {
    if (imageData) {
      console.log('Données de l\'image :', imageData);
    } else {
      console.error('Erreur lors de la récupération de l\'image.');
    }
  })
  .catch((error) => {
    console.error('Erreur inattendue :', error);
  });
