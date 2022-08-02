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

exports.connexion = async (requete, res) => {

  const { email, password } = requete.body
  const utilisateur = await Utilisateur.findOne({ email })

  if (!utilisateur) {
    return res.status(403).send({ message: 'email / password inconnu' })
  }

  const bcrypt = require('bcrypt')

  const valid = bcrypt.compareSync(password, utilisateur.password)

  if (!valid) {
    return res.status(403).send({ message: 'email / password inconnu' })
  }

  const jwt = require('jsonwebtoken')

  const expireIn = 24 * 60 * 60
  const token = jwt.sign(
    {
      email: email,
    },
    'azerty123',
    {
      expiresIn: expireIn,
    },
  )
  res.header('Access-Control-Expose-Headers', 'Authorization')
  res.header('Authorization', 'Bearer ' + token)

  return res.status(200).json('auth_ok')
}