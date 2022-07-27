const Utilisateur = require('../models/utilisateur.model.js')

const multer = require('multer')
const { uploadConfig } = require('../configuration.js')

const upload = uploadConfig.any()

exports.create = (requete, resultat) => {
  upload(requete, resultat, (erreur) => {
    try {
      if (erreur instanceof multer.MulterError) {
        resultat.status(400).send({ message: 'image trop lourde' })
        return
      } else if (!requete.files[0]) {
        resultat.status(400).send({ message: "l'image est obligatoire" })
        return
      }

      const json = JSON.parse(requete.body.utilisateur)
      
      const bcrypt = require('bcrypt')

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(json.password, salt)

      const utilisateur = new Utilisateur({
        email: json.email,
        password: hash,
        avatar_url: requete.files[0].filename,
      })

      utilisateur
        .save()
        .then((donnees) => {
          donnees.password = undefined
          resultat.status(201).send(donnees)})
        .catch((erreur) =>
          resultat.status(500).send({ message: erreur.message }),
        )
    } catch {
      resultat.status(500).send({ message: 'erreur du serveur' })
    }
  })
}

exports.findAll = (requete, resultat) => {
  Utilisateur.find()
    .then((listeUtilisateur) => resultat.send(listeUtilisateur))
    .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
}

exports.findByEmail = (requete, resultat) => {
  Utilisateur.findOne({ email: requete.params.email })
    .then((utilisateur) => resultat.send(utilisateur))
    .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
}


exports.deleteByEmail = (requete, resultat) => {
  Utilisateur.findOneAndRemove({ email: requete.params.email }).then(
    (utilisateur) => {
      if (!utilisateur) {
        return resultat
          .status(404)
          .send({
            message: "l'email : " + requete.params.email + " n'existe pas",
          })
      }
      return resultat.send({ message: "l'utilisateur est bien supprimé" })
    },
  )
}