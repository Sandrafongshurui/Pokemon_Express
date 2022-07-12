const express = require('express')
//re quires form the controller, cos the controller is where the database is
const pokemonController = require('./controllers/pokemon_controller')

const app = express()
const port = 3000

// tell express which template engine to use
app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

//this is the route
//get from controller, the funtion
app.get('/pokemon', pokemonController.listPokemon)


app.get('/pokemon/:id', pokemonController.showPokemon)

//need this to have a css style page
app.use("/public", express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})