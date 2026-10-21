const express = require('express');
var router = express.Router();
const GamesModel = require('../models/games.js');

// perhaps one function for list of games and one for detailed one game at a time?

router.get("/",async function(req,res)
{
    const results = await GamesModel.getAllGames();
    req.TPL.games=results;
    res.render("games",req.TPL);
});



module.exports = router;