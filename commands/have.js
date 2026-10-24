const { SlashCommandBuilder } = require('discord.js');
const GameModel = require('../models/game.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('have')
		.setDescription('Queries if the store has a game')
        .addStringOption(option => option.setName('game').setDescription('The name of the game')),
	async execute(interaction) {
        const value = interaction.options.getString('game');
        let outputMessage = '';
        if (value)
        {
            console.log(value);
            const have=await GameModel.getOneGame(value);
            console.log(have);
            
            if (have)
            {
                outputMessage=`Yes it's described as a ${have[0]['description']}`;
                return interaction.reply(outputMessage);
            }
            else 
            {
                return interaction.reply(`No value detected`);
            }
                
            return interaction.reply(`coming soon for game \`${value}\``);
        }
        else 
        {
            return interaction.reply('enter a game name');
        }
	},
};
