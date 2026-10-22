const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');



router.get("/",async function(req,res)
{
    req.TPL.login_error = req.session.login_error;
    req.session.login_error = "";
    res.render("login",req.TPL);
});


router.post("/attemptlogin",async function(req,res)
{
    // put user check code here 
    const user = await UsersModel.getUserByCredentials(req.body.username,req.body.password);

    
    if (user)
    {
        req.session.username = user.username;
        req.session.level = user.level;
        req.TPL.membersnav=true;

        res.redirect("/home");
    }
    else 
    {
        req.session.login_error="Invalid user name or password";
        res.redirect("/login");
    }
        
});



router.get("/logout",async function(req,res)
{
    delete(req.session.username);
    delete(req.sessionlevel);
    res.redirect("/home");
});

module.exports = router;