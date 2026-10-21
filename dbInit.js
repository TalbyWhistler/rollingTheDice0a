const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function()
{
    db.run("DROP TABLE IF EXISTS Games");
    db.run("CREATE TABLE Games (title TEXT,description TEXT,company TEXT,price REAL,numberonhand INTEGER)");
    db.run("INSERT INTO Games VALUES(?,?,?,?,?)",['Monopoly','a Capitalism Game','Parker Brothers','29.95','15']);
    db.run("INSERT INTO Games VALUES(?,?,?,?,?)",['Catan','A Settlers Game','Germania','49.95','10']);
    db.run("INSERT INTO Games VALUES(?,?,?,?,?)",['Clue','A Game Where You Solve Murders','Milton Bradley?','39.99','11']);
});


