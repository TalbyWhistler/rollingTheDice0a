var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
    db = await sqlite.open(
        {
            filename: 'database.db',
            driver: sqlite3.Database
        }
    );
}

startup();


async function getOneGame(gameTitle)
{
    const results = db.all("SELECT rowid AS id, * FROM Games where title=?",[gameTitle]);
    return results;
}


module.exports=
{
    getOneGame
};