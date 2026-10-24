const express = require('express');
var router = express.Router()


router.get("/",async function(req,res)
{
    console.log("add game area");
    res.render("addgame");
   // res.redirect("/members");
});


module.exports = router;
