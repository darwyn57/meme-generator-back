module.exports = (app) => {
    const memeController = require('../controllers/meme.controller.js')
  
    app.post('/meme', memeController.create)
  
    app.get('/memes', memeController.findAll)
  
    app.delete('/meme/:nom', memeController.deleteByNom)
  }