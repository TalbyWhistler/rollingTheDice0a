const express=require('express');
var router=express.Router();


router.get("/",function(req,res)
{
    //req.TPL.title=gameTitle;
    res.render("editgame");
});

module.exports = router;
