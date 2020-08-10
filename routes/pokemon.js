const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
// const { where } = require('sequelize/types');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async(req, res) => {
  // TODO: Get all records from the DB and render to view

  const pokemon1 = await db.pokemon.findAll();

  res.render('favorites', { pokemon: pokemon1 });
});


  router.post('/', async (req, res) => {

    try {
      await db.pokemon.findOrCreate({
        where: {
          name: req.body.name,
        },
      })
      res.redirect('/pokemon');

    }catch(err){
      console.log(err);
    }
  });


  //showing pokemon pic
  router.get('/:name', async (req, res) => {

    try {
      if (req.params.name) {
        const url = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
        const result = await axios.get(url);
        let poke1 = result.data;
        res.render('show', {pokedata: poke1});
      }
    }catch(err) {
      console.log(err);
    }

  })




    //   db.pokemon.findAll()
//   .then(pokemons => {
//     // will send a pokemon to favorite page once it is selevted a favorite
//     res.render('..views/favorites', {pokemons})
//   })
//   res.send('Render a page of favorites here');
// });

// POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   db.database
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);

// });

module.exports = router;
