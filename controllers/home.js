const express = require('express');
var router = express.Router()


router.get("/",async function(req,res)
{
    res.render("home",req.TPL);
});


module.exports = router;
