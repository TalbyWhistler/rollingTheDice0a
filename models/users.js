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

async function getUserByCredentials(username,password)
{
    const result = await db.get("SELECT * FROM Users WHERE username=? AND password=?",[username,password]);
    return result;
}


module.exports = {getUserByCredentials};