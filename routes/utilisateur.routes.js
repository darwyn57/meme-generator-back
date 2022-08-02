module.exports = (app) => {
    const utilisateurController = require('../controllers/utilisateur.controller.js')
  
    app.post('/utilisateur', utilisateurController.create)
  
    app.get('/utilisateurs', utilisateurController.findAll)

    app.get('/utilisateur/:email', utilisateurController.findByEmail)
  
    app.delete('/utilisateur/:email', utilisateurController.deleteByEmail)

    app.post('/connexion', utilisateurController.connexion)
  }