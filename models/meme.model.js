const mongoose = require('mongoose'); // Import de mongoose
const MemeSchema = new mongoose.Schema({
    nom: String,// Le nom du meme
    description: String,// La description du meme
    image_url: String// L'url de l'image
},{
    timestamps: true // Ajoute les champs createdAt et updatedAt
})// Création du schéma

module.exports = mongoose.model('Meme', MemeSchema);// le meme schema est exporté en tant que model