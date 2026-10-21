const express=require('express');
const app=express();

app.post("/myroute",function(req,res)
{
    res.send("You are visiting my route");
});


const server=app.listen(3000,function()
{
    console.log("App listening...");
});