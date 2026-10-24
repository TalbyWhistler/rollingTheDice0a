const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('have')
		.setDescription('Queries if the store has a game')
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
