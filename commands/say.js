const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('I say what you want me to say!')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('What you want me to say!')
                .setRequired(true)),
    category: 'fun',
    async execute(interaction) {
        const author = interaction.user;
        const text = interaction.options.getString('text');
        const sayEmbed = new EmbedBuilder()
            .setTitle(`${author.username} says:`)
            .setDescription(`${text}`)
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` })
            .setColor('Random');
        await interaction.reply({ embeds: [sayEmbed] });
    }
};