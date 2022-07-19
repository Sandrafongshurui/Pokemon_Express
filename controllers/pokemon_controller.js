
//controller is the glue, it will talkto the view and the modal
//servers take from this controller(controllers)
//this controller takes from the model, the database handler
const {ObjectID, ObjectId} = require('mongodb')
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
        const pokemonId = req.params.id

        // validate valid object ID
        if (!ObjectId.isValid(pokemonId)) {
            res.render('show', {
                p: [],
                errMsg: "object id is not valid",
            })
            return
        }

        // get the pokemon with the id from the database
        let p = null
        try {
            p = await pokemonModel.getPokemon(pokemonId)
        } catch (err) {
            res.render('show', {
                p: [],
                errMsg: "failed to retrieve pokemon",
            })
            return
        }

        // get the pokemon with the id from the raw database
        const selectedPokemonId = await pokemonModel.getPokemon(pokemonId)

        //const selectedPokemonId = pokemon[idNum]
        res.render('show.ejs', {
            myPageTitle: "Gotta Catch 'Em All",
            selectedPokemonId, // short form for pokemonId: pokemonId, the query, this is an object
            //the idnum is needed for the form put
            errMsg: ""
        })
    },

    newPokemonForm: (req, res) => {
        //create a form

        res.render("new")
    },

    //this is meant to update the data base, this is the put
    updatePokemon: (req, res) => {
        //date get form body beacuse thi is a fake put
        const name = req.body.pokemon_name
        const id = req.params.id
        // console.log(pokemon.indexOf(id))
        //const idNum = parseInt(id)
        pokemon[id].name = name
        //console.log(id)
        console.log(name)
        console.log(id)
        res.redirect(`/pokemon/${id}`)
    },


    createPokemon: (req, res) => {
        //date get form boy beacuse thi is a post
        const data = req.body
        console.log(data)
        // validation
        if (!data.pokemon_name) {
            res.send('pokemon name is not set')
            return
        }

        // add the new pokemon to the "database"
        pokemon.push({
            name: data.pokemon_name,
            img: "http://img.pokemondb.net/artwork/" + data.pokemon_name
        })
        res.redirect('/pokemon');
        // res.send('pokemon created')

    },

    deletePokemon: (req, res) => {
        pokemon.splice(req.params.id, 1); //remove 1 item from the array
        res.redirect('/pokemon');  //redirect back to index rroute
    }
}

//must have export then can .require which is a node.js way
module.exports = controller