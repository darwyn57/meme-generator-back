const Meme = require('../models/meme.model.js')

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

    const json = JSON.parse(requete.body.meme)

    const meme = new Meme({
      nom: json.nom,
      description: json.description,
      image_url: requete.files[0].filename,
    })

    meme
      .save()
      .then((donnees) => resultat.status(201).send(donnees))
      .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
  })
}

exports.findAll = (requete, resultat) => {
  Meme.find()
    .then((listeMeme) => resultat.send(listeMeme))
    .catch((erreur) => resultat.status(500).send({ message: erreur.message }))
}

exports.deleteByNom = (requete, resultat) => {
  Meme.findOneAndRemove({ nom: requete.params.nom }).then((meme) => {
    if (!meme) {
      return resultat
        .status(404)
        .send({ message: 'le nom : ' + requete.params.nom + " n'existe pas" })
    }
    return resultat.send({ message: 'le meme est bien supprimé' })
  })
}