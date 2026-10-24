const express = require('express');
var router = express.Router();
const SubmitGameModel = require('../models/submitgame.js');

router.post("/",function(req,res)
{
    //console.log("SUBMIT EDIT FILE?");
    //console.log(req.body.title);


    let title=req.body.title;
    let description=req.body.description;
    let company=req.body.company;
    let price=req.body.price;
    let numberonhand=req.body.numberonhand;
    
   
    SubmitGameModel.submitnew(title,description,company,price,numberonhand);
    


    res.redirect("/members");
   // console.log(req.body);
});

module.exports = router;