module.exports = (app) => {// Définition des routes
    const memeController = require('../controllers/meme.controller.js'); // Import du controller

    const multer = require('multer');// Import du module multer
// On défini la façon dont l'image sera stockée

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (requete, fichier, cb) => {
      cb(
        null,
        Date.now() +
          '_' +
          fichier.originalname.replace(/[^a-z0-9\.]/gi, '_').toLowerCase(),
      )
    },
  })

    app.post("/meme", memeController.create); // Création d'un nouveau meme

    app.get("/memes", memeController.findAll); // Récupération de tous les memes

    app.delete("/meme/:nom", memeController.deletByNom); // Suppression d'un meme par son nom
}