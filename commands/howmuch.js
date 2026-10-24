const { SlashCommandBuilder } = require('discord.js');
const GameModel = require('../models/game.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('howmuch')
		.setDescription('Queries what the price of a game is')
        .addStringOption(option => option.setName('game').setDescription('The name of the game')),
	async execute(interaction) {
        const value = interaction.options.getString('game');
        if (value)
        {
            console.log(value);
            const have=await GameModel.getOneGame(value);
            console.log(have);
            if (have[0])
            {
                 let price=have[0]["price"]?have[0]["price"]:"0";
                 let title=have[0]["title"];
                return interaction.reply(`${title} is $${price}`);
            }
            else 
            {
                return interaction.reply(`I don't think we have a game by the title of ${value}`);
            }
           
            return interaction.reply(`coming soon for game \`${value}\``);
        }
        else 
        {
            return interaction.reply('enter a game name');
        }
		
	},
};
