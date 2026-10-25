const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

/*



*/
const express = require('express');
const app = express();
const http = require('http').Server(app);
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
http.listen(3000, function() { console.log('Server listening...'); });