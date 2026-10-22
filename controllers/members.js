const express = require('express');
var router = express.Router();
const GamesModel = require('../models/games.js');


router.get("/",async function(req,res)
{
     const results=await GamesModel.getAllGames();
     req.TPL.games=results;
    //res.render("games",req.TPL);
    res.render("members",req.TPL);
});


function testFunction()
{
    console.log("testFunction");
}

module.exports = router;