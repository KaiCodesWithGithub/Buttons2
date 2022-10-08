const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Returns user avatar.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user avatar to return.')
                .setRequired(false)),
    category: 'fun',
    async execute(interaction) {
        const chosenUser = interaction.options.getUser('user');
        let user;

        if (chosenUser) user = chosenUser;
        else user = interaction.user;

        const avatarEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${user.username}'s Avatar`)
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` })
            .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
            .setTimestamp();

        interaction.reply({ embeds: [avatarEmbed] });
    }
};