const fs = require('fs');
const path = require('path');

class StockImage {
  stock(image) {
    const jsonPath = path.join(__dirname, '..', 'images', 'images.json');
    let data = [];
    try {
      data = require(jsonPath);
    } catch (err) {
      console.log(err)
    }

    data.push(image);

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

    console.log('Image enregistrée avec succès dans le fichier JSON.');
  }
}

module.exports = StockImage;