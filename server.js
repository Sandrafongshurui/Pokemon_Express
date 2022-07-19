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

//middle wares
//get from controller, the funtion
// The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json().
app.use(express.urlencoded({extended: true}))

//use this tpo fake th form(get post) to use as a put, cos the form will go to middleware, and sees _method and bring it to this method overi
//include the method-override package
const methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our edit form named _method
//
app.use(methodOverride('_method'));



//this is the routes
//index action
app.get('/pokemon', pokemonController.listPokemon)

//new action, above show action beacuse its more specific
// new action: to display form to create a new pokemon
app.get('/pokemon/new', pokemonController.newPokemonForm)

//show action
app.get('/pokemon/:id', pokemonController.showPokemon)
app.put('/pokemon/:id', pokemonController.updatePokemon)

//create action
app.post('/pokemon', pokemonController.createPokemon)

app.delete('/pokemon/:id', pokemonController.deletePokemon)
//need this to have a css style page
app.use("/public", express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})