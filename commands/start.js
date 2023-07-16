const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { joinVoiceChannel } = require('@discordjs/voice')

// start.js
module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription("Starts the game!!"),
    execute: async ({ client, interaction }) => {
        // Checking if member is in a voice chat or not
        if (!interaction.member.voice.channel) return interaction.reply("Please join a voice channel to play");

        // If member is in a voice channel
        if (!client.currentGames.has(interaction.guild.id)) {
           

            client.currentGames.add(interaction.guild.id)
            const voice_channel = interaction.member.voice.channel; // Get voice channel ID

            // Reacting to the message
            const init_msg = await interaction.reply({ content: "Connected to voice channel { " + voice_channel.id + " }", fetchReply: true });
            init_msg.react('❤️'); // Replace with the desired emoji

            // Joining the voice channel
            const connection = joinVoiceChannel({
                channelId: voice_channel.id,
                guildId: voice_channel.guild.id,
                adapterCreator: voice_channel.guild.voiceAdapterCreator,
            });
        } else {
            await interaction.reply("A game is already running");
        }
    },
};
