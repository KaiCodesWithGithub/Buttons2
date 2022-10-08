const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest something!')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('What you want to suggest.')
                .setRequired(true)),
    category: 'fun',
    async execute(interaction) {
        const suggestion = interaction.options.getString('suggestion');
        const suggestEmbed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} has suggested something!`)
            .setDescription(`Suggestion: ${suggestion}`)
            .setColor('Random')
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` });
        const message = await interaction.reply({ embeds: [suggestEmbed], fetchReply: true });
        message.react('👍').then(() => message.react('👎')).catch(error => console.log('One of the emojis failed to react:', error));
    }
};