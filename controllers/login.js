const express = require('express');
var router = express.Router();



router.get("/",async function(req,res)
{
    req.TPL.login_error = req.session.login_error;
    req.session.login_error = "";
    res.render("login",req.TPL);
});


router.post("/attemptlogin",async function(req,res)
{
    // put user check code here 

    console.log("attempt login");
    console.log(req.body.username);
    console.log(req.body.password);
    let inputUser=req.body.username;
    let inputPassword=req.body.password;
    if (inputUser=="username" && inputPassword=="password")
    {
        req.session.username=inputUser;
        req.session.level = "editor";
        res.redirect("/members");
    }
    else 
    {
        req.session.login_error="Invalid user name or password";
        res.redirect("/login");
    }

    /*
    if (user)
    {
        req.session.username = user.username;
        req.session.level = user.level;
        res.redirect("/members");
    }
    else 
    {
        req.session.login_error="Invalid user name or password";
        res.redirect("/login");
    }
        */
});



router.get("/logout",async function(req,res)
{
    delete(req.session.username);
    delete(req.sessionlevel);
    res.redirect("/home");
});

module.exports = router;