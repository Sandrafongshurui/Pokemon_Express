//fs module interacts with the file system
const fs = require('fs')
const basePath = './routes'

//readdirSync read the contents of a given directory, which is set as basepath 
//The method returns an array with all the file names or objects in the directory.
//once return go through each element in the array(will be each file in folder called routes, abilities.js, pokemon.js)
function setRoutes(app) {
  fs.readdirSync(basePath)
    .forEach(fileName => {
      const baseFileName = `/${removeExtension(fileName)}`
      //import that route.js
      const route = require(`${basePath}/${fileName}`)
      //middleware for each route,
      // if it hits the basefile name of "pokemon", it will import pokemon.js
      //means any of these, that were orginally in the server.js
      // app.get('/pokemon/new', pokemonController.newPokemonForm)
      // app.get('/pokemon/:id', pokemonController.showPokemon)
      // app.put('/pokemon/:id', pokemonController.updatePokemon)
      //if basefile name not specify means this middlewear happnes for every route
      app.use(baseFileName, route);///app.use("pokemon", require("./routes/pokemon.js")
      console.log("set route for", baseFileName)
    })
}

//get rid of the .js part, so pokmeon.js becomes pokemon
function removeExtension(fileName) {
  const list = fileName.split('.')
  list.pop();
  return list.join('/')
}

module.exports = setRoutes//imported into server.js, will replace all the routes there