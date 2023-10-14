const list = require("./list");
const fs = require("fs");

class TransformeImage {
  async sequencage(image, steps) {
    const effectsType = list.effects;
    const filtersType = list.filters;
    let newTransform = ""
  
    for (const step in steps) {
      const value = steps[step];
      if (effectsType.includes(step)) {
        newTransform += await this.applyEffect(step, value);
      } else if (filtersType.includes(step)) {
        newTransform += await this.applyFilter(step, value);
      }
    }
    const newImage = image + newTransform
    return newImage; 
  }
  async applyEffect(effectType, params) {
    const response = await fetch("http://localhost:4002/effect", {
      method: "POST",
      body: [effectType, params],
      headers: {
        "Content-Type": "application/json",
      },
    });
    const effects = await response.json();
    return effects;
  }

  async applyFilter(filterType, params) {
    const response = await fetch("http://localhost:4001/filter", {
      method: "POST",
      body: [filterType, params],
      headers: {
        "Content-Type": "application/json",
      },
    });

    const filters = await response.json();
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
