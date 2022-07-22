//import the connection
const mongodb = require('../mongodb')
//import the data you want to connext to, can be more then one, example trainersdata
const pokemonData = require('./pokemon')

async function run() {

  try {
    //inseid the connection, get the db.collection , if dun hv one, one is created, and insert the seed data
    //insert return a promise, so need to be a async
    //can seed diff collections, in the database, example abilities collections
    const insertResult = await mongodb.db.collection('pokemon').insertMany(pokemonData)
    console.log(insertResult)

  } catch(err) {

    console.log(err)

  } finally {

    mongodb.client.close()
    
  }
  
}

//execute the actual seeding of the actual base
//will appear in compass, or u try mongo, shows dbs, show collections
run();
