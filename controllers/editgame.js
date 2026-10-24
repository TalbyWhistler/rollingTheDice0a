const express=require('express');
var router=express.Router();
const GameModel = require('../models/game.js');
/*
router.get("/",function(req,res)
{
    
    res.render("editgame");
});
*/
router.get("/:id",async function(req,res)
{
    req.TPL.title=req.params.id;
    const results=await GameModel.getOneGame(req.params.id);
    req.TPL.gameinfo=results;
   // console.log(results);
    //console.log(req.params.id);
    res.render("editgame",req.TPL);

});

/*
router.get("/submitedit",function(req,res)
{
    console.log("SUBMIT EDIT");
});
*/
module.exports = router;
