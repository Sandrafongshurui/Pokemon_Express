
//controller is the glue, it will talkto the view and the modal
//servers take from this controller(controllers)
//this controller takes from the database (model)
const pokemon = require('../models/pokemon')


//this is just the route
//this is the controller to import
//real case maybe hv many funtions that deals with the data
const controller = {
    //this function is used in sever.js
    listPokemon: (req, res) => {
        // res.json(pokemon)
        //render the template engine, needs the name of the ejs and an object
        res.render('index.ejs', {
            myPageTitle: "See All The Pokemon!",
            pokemon // short form for pokemon: pokemon, the database from model
        })
    },
    // get the pokemon id from route param
    // validate the pokemon id
    // get the pokemon with the id from the "database"
    // render the "show" ejs template
    showPokemon: (req, res) => {
        const pokemonId = req.params.id


        // validate the pokemon id
        const idNum = parseInt(pokemonId)
        let errMsg = ''
        if (isNaN(idNum)) {
            errMsg = 'must be number'
        }
        if (idNum < 0 || idNum > pokemon.length) {
            errMsg = 'must be within range'
        }
        console.log(idNum)

        const selectedPokemonId = pokemon[idNum]
        res.render('show.ejs', {
            myPageTitle: "Gotta Catch 'Em All",
            selectedPokemonId, // short form for pokemonId: pokemonId, the query
            errMsg
        })
    }
}

//must have export then can .require which is a node.js way
module.exports = controller