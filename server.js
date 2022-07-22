const express = require('express')
//requires from the controller, controller is used in the routes files instead
const pokemonController = require('./controllers/pokemon_controller')
const setRoutes = require('./setRoutes')
//use this tpo fake th form(get post) to use as a put, cos the form will go to middleware, and sees _method and bring it to this method overi
//include the method-override package
const methodOverride = require('method-override');

const app = express()
const port = 3000

//middle wares
// tell express which template engine to use
app.set('view engine', 'ejs')
//get from controller, the funtion
// The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json().
app.use(express.urlencoded({extended: true}))


//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our edit form named _method
app.use(methodOverride('_method'));
//need this to have a css style page
app.use("/public", express.static("public"));


//this  funstion shows that i have a routes folder with the different routes in them
// pokemon.js, abilities.js, in each .js file will be the individual routes, instead of displaying all here
setRoutes(app)
//put all this /pokemon routes into a route folder first
// //index action
// app.get('/pokemon', pokemonController.listPokemon)

// //new action, above show action beacuse its more specific
// // new action: to display form to create a new pokemon
// app.get('/pokemon/new', pokemonController.newPokemonForm)

// //show action
// app.get('/pokemon/:id', pokemonController.showPokemon)
// app.put('/pokemon/:id', pokemonController.updatePokemon)

// //create action
// app.post('/pokemon', pokemonController.createPokemon)

// app.delete('/pokemon/:id', pokemonController.deletePokemon)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})