//this handles the raw database, can cahnge to mongoose which will handle the model better
const { ObjectId } = require('mongodb')
const mongodb = require('../database/mongodb')
const collectionName = 'pokemon'
const collection = mongodb.db.collection(collectionName)

const model = {
    //this are mongodb functions, the ones we did for bounties, can use mongoose to make it cleaner
    listPokemon: () => {
        const cursor = collection.find()
        return cursor.toArray()
    },

    getPokemon: pokemonID => {
        //findOne is the cursor thing
        console.log(ObjectId(pokemonID))
        return collection.findOne(ObjectId(pokemonID))
    },

    createPokemon: fields => {
        return collection.insertOne(fields)
    },

    updatePokemon: (pokemonID, update)  => {
        //pokemonID only gets the number, objectId() gets the id with the ibhect word to match the db
        return collection.updateOne({_id:ObjectId(pokemonID)}, update, {upsert:true})
    },

    deletePokemon: (pokemonID) => {
        console.log(pokemonID)
        collection.deleteOne({_id:ObjectId(pokemonID)})
    }

}

module.exports = model
