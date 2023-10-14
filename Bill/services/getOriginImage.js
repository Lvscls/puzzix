class OriginImage {
  async getImage() {
    try {
      const response = await fetch('http://localhost:4000/image', {
        method: 'GET',
      });

      if (response.ok) {
        const imageData = await response.text()
        return imageData
      } else {
        console.error('Une erreur est survenue lors de la récupération de l\'image.');
      }
    } catch (error) {
      console.error('Une erreur inattendue est survenue :', error);
    }
  }
}


module.exports = OriginImage;