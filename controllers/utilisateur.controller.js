const Utilisateur = require('../models/utilisateur.model.js')

const multer = require('multer')
const { uploadConfig } = require('../configuration.js')

const upload = uploadConfig.any()

exports.create = (requete, resultat) => {
  upload(requete, resultat, (erreur) => {
    if (erreur instanceof multer.MulterError) {
      resultat.status(400).send({ message: 'image trop lourde' })
      return
    }else if (!requete.files[0]) {
      resultat.status(400).send({ message: "l'image et obligatoire" })
      return
    }

    const json = JSON.parse(requete.body.utilisateur)
    const bcrypt = require('bcrypt')
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(json.password, salt);



    const utilisateur = new Utilisateur({
      email: json.email,
      password: hash,
      avatar_url: requete.files[0].filename,
    })

    utilisateur
      .save()
      .then((donnees) => resultat.status(201).send(donnees))
      .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
  })
}

exports.findAll = (requete, resultat) => {
  Utilisateur.find()
    .then((listeUtilisateur) => resultat.send(listeUtilisateur))
    .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
}
exports.findByEmail = (requete, resultat) => {
  Utilisateur.findOne({ email: requete.params.email })
    .then((listeUtilisateur) => resultat.send(listeUtilisateur))
    .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
}

exports.deleteByEmail = (requete, resultat) => {
  Utilisateur.findOneAndRemove({ nom: requete.params.nom }).then((utilisateur) => {
    if (!utilisateur) {
      return resultat
        .status(404)
        .send({ message: "l'email: " + requete.params.eamil + " n'existe pas" })
    }
    return resultat.send({ message: 'l\'utilisateur est bien supprimé' })
  })
}