const express = require('express')
const cors = require('cors');
const app = express()
const port = 4000

//rend accessible à l'extérieur le contenu du dossier public
app.use(express.static('public')) 

// Traite des requete dons le "content-type" est "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }))

// Traite des requete dons le "content-type" est "application/json"
app.use(express.json())

// Accepte les requetes provenant d'origine differente
app.use(cors());
// Route de base
app.get('/', (requete,resultat)=> resultat.send('le serveur mache!'))
// Appel des routes
require('./routes/meme.routes.js')(app)
// Lancement du serveur
app.listen(port, () => {
    console.log(`Le serveur est accessible sur le port : ${port}`)
})

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/generator_meme', {useNewUrlParser: true})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


