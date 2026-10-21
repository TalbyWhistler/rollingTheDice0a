const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs=require('fs');

app.engine("mustache",mustacheExpress());
app.set('view engine','mustache');
app.set('views',__dirname + '/views');


app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false
}));

app.use(function(req,res,next)
{
    req.TPL={};
    req.TPL.displaylogin=!req.session.username;
    req.TPL.displaylogout=req.session.username;
    req.TPL.iseditor=req.session.level == "editor";

    next();
});



app.use("/home",require("./controllers/home"));
app.use("/login",require("./controllers/login"))
app.use("/members",require("./controllers/members"));
app.use("/games",require("./controllers/games"));


app.get("/",function(req,res)
{
    res.redirect("/home");
});


var server = app.listen(3000,function()
{
    console.log("Server listening...");
});

