const express = require('express');
var router = express.Router();


router.get("/",function(req,res)
{
    res.render("members",req.TPL);
});


module.exports = router;