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



async function submitgame(title,description,company,price,numberonhand)
{
    
    
    
    console.log(
        `
        ${title}
        ${description}
        ${company}
        ${price}
        ${numberonhand}`
    );
    await db.run("update games set title=?, description=?,company=?,price=?,numberonhand=? where title=?",[title,description,company,price,numberonhand,title]) ;
    
}


module.exports = { submitgame };