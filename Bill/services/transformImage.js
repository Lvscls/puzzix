const list = require("./list");
const fs = require("fs");

class TransformeImage {
  async sequencage(image, steps) {
    const effectsType = list.effects;
    const filtersType = list.filters;
    const imagesAltered = [];
    console.log(steps);
    for (const step in steps) {

      const value = steps[step];

      if (effectsType.includes(step)) {
        image = await this.applyEffect(image, step, value);
        imagesAltered.push(image);
      } else if (filtersType.includes(step)) {
        image = await this.applyFilter(image, step, value);
        imagesAltered.push(image);
      }
    }
    console.log(image)
    return image;
  }
  async applyEffect(image, effectType, params) {
    const response = await fetch("http://localhost:4002/effect", {
      method: "POST",
      body: JSON.stringify({
        image: image,
        effectType: effectType,
        params: params,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const effects = await response.text();
    return effects;
  }

  async applyFilter(image, filterType, params) {
    const response = await fetch("http://localhost:4001/filter", {
      method: "POST",
      body: JSON.stringify({
        image: image,
        filterType: filterType,
        params: params,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const filters = await response.text();
    return filters;
  }
  getStepsinFile() {
    if (fs.existsSync("steps.json")) {
      try {
        const data = fs.readFileSync("steps.json", "utf8");
        const steps = JSON.parse(data);

        if (typeof steps === "object" && Object.keys(steps).length > 0) {
          return steps;
        } else {
          console.error(
            "Le fichier JSON ne contient pas un objet JSON valide ou il est vide."
          );
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse du fichier JSON :", error);
      }
    } else {
      console.error('Le fichier "steps.json" n\'existe pas.');
    }
  }
}

module.exports = TransformeImage;
