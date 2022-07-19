//import the connection
const mongodb = require('../mongodb')
const pokemonData = require('./pokemon')

async function run() {

  try {
    //inseid the connection, get the db.collection , if dun hv one, one is created, and insert the seek data
    const insertResult = await mongodb.db.collection('pokemon').insertMany(pokemonData)
    console.log(insertResult)

  } catch(err) {

    console.log(err)

  } finally {

    mongodb.client.close()
    
  }
  
}

//execute the actual seeding of the actual base
run();
