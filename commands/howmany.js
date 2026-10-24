const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('howmany')
		.setDescription('Queries what the remaining stock of that game is')
         .addStringOption(option => option.setName('game').setDescription('The name of the game')),
	async execute(interaction) {
        const value = interaction.options.getString('game');
        if (value)
        {
            return interaction.reply(`coming soon for game \`${value}\``);
        }
        else 
        {
            return interaction.reply('enter a game name');
        }
		
	},
};
