//Handle the connection of the database
//so that we can import this onnection to whereeverw need
// import MongoClient from mongodb lib, out of the many other exports
const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://localhost:27017";
const dbName = "poke_express"

const Client = new MongoClient(uri)
const Db = Client.db(dbName)

module.exports = {
    client: Client,
    db: Db,
}



