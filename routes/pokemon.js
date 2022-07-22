//these are the routes that would previously be in the server.js, which is now call setRoutes(spp)
//change all "/pokemon" to "/" because is alr spcified for "pokemon" in the middleware
const router = require('express').Router()//get the specific router part only, no need the whole express library
const pokemonController = require('../controllers/pokemon_controller')

// index action
router.get('/', pokemonController.listPokemon)

// new action: to display form to create a new pokemon
router.get('/new', pokemonController.newPokemonForm)

// show action
router.get('/:pokemon_id', pokemonController.showPokemon)
router.put('/:pokemon_id', pokemonController.updatePokemon)
router.delete('/:pokemon_id', pokemonController.deletePokemon)

// create action
router.post('/', pokemonController.createPokemon)

module.exports = router
