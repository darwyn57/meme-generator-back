const mongoose = require('mongoose'); // Import de mongoose
const UtilisateurSchema = new mongoose.Schema({
   email: String,// L'email de l'utilisateur
   password: String,// Le mot de passe de l'utilisateur
   avatar: String,// L'avatar de l'utilisateur
},{
    timestamps: true // Ajoute les champs createdAt et updatedAt
})// Création du schéma

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);//  UtilisateurSchema est exporté en tant que model