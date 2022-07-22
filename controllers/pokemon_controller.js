
//controller is the glue, it will talkto the view and the modal
//servers take from this controller(controllers)
//this controller takes from the model, the database handler
const { ObjectId } = require('mongodb')
const model = require('../models/pokemon')
const pokemonModel = require('../models/pokemon')


//this is just the route
//this is the controller to import
//real case maybe hv many funtions that deals with the data
const controller = {
    //this function is used in sever.js
    listPokemon: async (req, res) => {
        //get the pokemon in a list which will be an array
        const pokemonData = await pokemonModel.listPokemon()

        res.render('index.ejs', {
            myPageTitle: "See All The Pokemon!",
            pokemon: pokemonData
        })
    },
    // get the pokemon id from route param
    // validate the pokemon id
    // get the pokemon with the id from the "database"
    // render the "show" ejs template
    showPokemon: async (req, res) => {
        //the given id by mongo
        const pokemonId = req.params.pokemon_id

        // validate valid object ID
        if (!ObjectId.isValid(pokemonId)) {
            res.render('show', {
                selectedPokemonId: [],
                errMsg: "object id is not valid",
            })
            return
        }

        // get the pokemon with the id from the database
        let selectedPokemonId = null
        try {
            selectedPokemonId = await pokemonModel.getPokemon(pokemonId)
            console.log(typeof selectedPokemonId)
        } catch (err) {
            res.render('show', {
                selectedPokemonId: [],
                errMsg: "failed to retrieve pokemon",
            })
            return
        }

        res.render('show.ejs', {
            myPageTitle: "Gotta Catch 'Em All",
            selectedPokemonId, // short form for pokemonId: pokemonId, the query, this is an object
            errMsg: ""
        })
    },

    newPokemonForm: (req, res) => {
        //create a form

        res.render("new")
    },

    //this is meant to update the data base, this is the put
    updatePokemon: async (req, res) => {
        //date get form body beacuse thi is a fake put
        //the params are there already coos this buttton is in the show.ejs
        const name = req.body.pokemon_name
        console.log(name)
        const pokemonId = req.params.pokemon_id
        const updateDoc = {
            $set: {
                name: req.body.pokemon_name//name:name
                
            },
        }

        const result = await pokemonModel.updatePokemon(pokemonId, updateDoc)
        console.log(result)
        res.redirect(`/pokemon/${pokemonId}`)
    },


    createPokemon: (req, res) => {
        //date get form boy beacuse thi is a post
        const data = req.body
        // validation, if didnt type name
        if (!data.pokemon_name) {
            res.send('pokemon name is not set')
            return
        }

        // add the new pokemon to the database
        try {
            pokemonModel.createPokemon({ name: data.pokemon_name, img: "http://img.pokemondb.net/artwork/" + data.pokemon_name })
        } catch (err) {
            res.send('failed to create pokemon')
            return
        }

        // redirect to list pokemon page
        res.redirect('/pokemon')

    },

    deletePokemon: (req, res) => {
        const pokemonId = req.params.pokemon_id
        pokemonModel.deletePokemon(pokemonId)
        res.redirect('/pokemon');  //redirect back to index rroute
    }
}

//must have export then can .require which is a node.js way
module.exports = controller