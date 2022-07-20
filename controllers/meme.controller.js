const Meme = require('../models/meme.model.js');// Import du model
// Création d'un nouveau meme
exports.create = (requete,resultat)=>{ 
    const meme = new Meme ({ 
        nom: requete.body.nom,
        description: requete.body.description,
        image_url: requete.body.image_url
})
// Sauvegarde du meme dans la base de données
    meme.save()
    .then((donnees)=> resultat.status(201).send(donnees))
    .catch((erreur)=> resultat.status(500).send({message: erreur.message}))
}
// Récupération de tous les memes
exports.findAll = (requete,resultat)=>{
    Meme.find()
    .then((listeMeme)=> resultat.send(listeMeme))
    .catch((erreur)=> resultat.status(500).send({message: erreur.message}))
   
}
exports.deletByNom = (requete,resultat)=>{
    Meme.findOneAndRemove({nom: requete.params.nom})
    .then(meme=>{
        if(!meme) {
            return resultat.status(404).send({message : 'le nom:'+ requete.params.nom +' n\'existe pas'})
        }
        return resultat.send({message: " Le Meme est bien supprimé"})
    })
}

