const multer = require('multer')

//On définit la façons dont l'image sera stockée
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

const filtreFichier = (requete, image, cb) => {

  cb(null, true)
}

exports.uploadConfig = multer({
  storage: storage,
  fileFilter: filtreFichier,
  limits: { fileSize: 1024 * 1024 },
})