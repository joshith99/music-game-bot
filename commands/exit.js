const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { getVoiceConnection } = require('@discordjs/voice');


// exit.js
module.exports = {
    data: new SlashCommandBuilder()
        .setName('exit')
        .setDescription("Exits the game!!"),
    execute: async ({ client, interaction }) => {
        // Check if the bot is in a voice channel
        
        const connection = getVoiceConnection(interaction.guild.id);

        if (client.currentGames.has(interaction.guild.id)) {
            connection.destroy();
            
            await interaction.reply("Successfully exited from voice channel");
        } else {
            await interaction.reply("The bot is not in a voice channel.");
        }
    }
};
