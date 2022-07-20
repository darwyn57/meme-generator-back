module.exports = (app) => {// Définition des routes
    const memeController = require('../controllers/meme.controller.js'); // Import du controller

    app.post("/meme", memeController.create); // Création d'un nouveau meme

    app.get("/memes", memeController.findAll); // Récupération de tous les memes

    app.delete("/meme/:nom", memeController.deletByNom); // Suppression d'un meme par son nom
}