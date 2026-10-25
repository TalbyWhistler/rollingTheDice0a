const { SlashCommandBuilder } = require('discord.js');
const GameModel = require('../models/game.js');


const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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
            
            if (have[0])
            {
                outputMessage=`Yes it's described as a ${have[0]['description']}`;
                return interaction.reply(outputMessage);
            }
            else 
            {
                return interaction.reply(`No I don't think we have that one!`);
            }
                
            return interaction.reply(`coming soon for game \`${value}\``);
        }
        else 
        {
            return interaction.reply('enter a game name');
        }
	},
};
