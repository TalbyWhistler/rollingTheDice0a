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
 /////////// nav link highlighting
app.use("/home",function(req,res,next)
{
    req.TPL.homenav = true;next();
});

app.use("/games",function(req,res,next)
{
    req.TPL.gamesnav=true;
    next();
});

app.use("/login",function(req,res,next)
{
    req.TPL.loginnav=true;
    next();
});

app.use("/members",function(req,res,next)
{
    req.TPL.membersnav=true;
    next();
}); 



app.use("/home",require("./controllers/home"));
app.use("/login",require("./controllers/login"))
app.use("/members",require("./controllers/members"));
app.use("/games",require("./controllers/games"));
app.use("/editgame",require("./controllers/editgame"));
app.use("/submitedit",require("./controllers/submitedit"));
app.use("/addgame",require("./controllers/addgame"));
app.use("/submitadd",require("./controllers/submitadd"));


app.get("/",function(req,res)
{
    res.redirect("/home");
});

/*
var server = app.listen(3000,function()
{
    console.log("Server listening...");
});
*/
const http = require('http').Server(app);
http.listen(3000,function()
{
    console.log("Server is listening....");
})
////////////////////////////////////////////////////////////////////
//const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

/*



*/
//const express = require('express');
//const app = express();

const io = require('socket.io')(http);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
};


/*
client.once('ready', () => {
	console.log('Ready!');
});
*/

client.once('clientReady', () => {
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
		//io.emit('botactivity', { command: interaction.commandName, time: new Date() });
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	console.log("bot activity?");
	console.log(interaction.commandName,new Date());
	//io.emit('botactivity', { command: interaction.commandName, time: new Date() });
	io.emit('botactivity', interaction.commandName+` ` +new Date());


});

app.get('/', function(req, res){  
  res.sendFile(__dirname + '/index.html');});
/*


io.on('connection', function(socket) {  
  
  // when a message is received, emit that message to *all* connections so it 
  // can be displayed in all chat windows 
  socket.on('chat message', function(msg){    
    io.emit('chat message', msg);  
  });

});
*/
client.login(token);
//http.listen(3000, function() { console.log('Server listening...'); });