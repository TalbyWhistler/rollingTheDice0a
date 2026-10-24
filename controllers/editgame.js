const express=require('express');
var router=express.Router();

/*
router.get("/",function(req,res)
{
    
    res.render("editgame");
});
*/
router.get("/:id",function(req,res)
{
    req.TPL.title=req.params.id;
    console.log(req.params.id);
    res.render("editgame",req.TPL);

});

module.exports = router;
