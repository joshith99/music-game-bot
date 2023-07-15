
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('begins the game'),
  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      await interaction.reply('You need to be in a voice channel to start the game.');
      return;
    }

    const members = await channel.members.fetch();
    const playerNames = members.map(member => member.user.username);
    console.log(`Players in the voice channel: ${playerNames.join(', ')}`);

    

    await interaction.reply('Game started!');

    
  },
};