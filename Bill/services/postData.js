const fs = require("fs");

class PostData {
  async stockImage(image) {
    try {
      const response = await fetch("http://localhost:4000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
      });

      if (response.ok) {
        console.log("L'image a été stockée avec succès.");
      } else {
        console.error(
          "Une erreur est survenue lors de l'envoi de l'image et des données."
        );
      }
    } catch (error) {
      console.error("Une erreur inattendue est survenue :", error);
    }
  }
  saveStepsinFile(steps) {
    fs.writeFileSync("steps.json", JSON.stringify(steps), "utf8");
  }

  
}

module.exports = PostData;
