const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beep')
        .setDescription('Replies with Boop!'),
    category: 'fun',
    async execute(interaction) {
        const beepEmbed = new EmbedBuilder()
            .setTitle('Boop!')
            .setColor('Random');
        await interaction.reply({ embeds: [beepEmbed] });
    }
};