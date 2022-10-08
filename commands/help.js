const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Gives list of commands.')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('What category you would like help with.')
                .setRequired(false)
                .addChoices(
                    { name: 'Fun', value: 'fun' },
                    { name: 'Information', value: 'info' }
                )),
    category: 'info',
    async execute(interaction) {
        const category = interaction.options.getString('category');
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
        const funCommands = [];
        const infoCommands = [];
        let chosenCategory;
        const sectionEmbed = new EmbedBuilder()
            .setTitle('Bot Help Sections')
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` })
            .addFields(
                { name: 'Fun Commands', value: 'Commands that all users can user that are for fun and have no purpose.' },
                { name: 'Information Commands', value: 'Commands that return some form of important information.' }
            );
        const funEmbed = new EmbedBuilder()
            .setTitle('Fun Commands')
            .addFields(funCommands)
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` });
        const infoEmbed = new EmbedBuilder()
            .setTitle('Information Commands')
            .addFields(infoCommands)
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` });

        for (const file of commandFiles) {
            const filePath = path.join(__dirname, file);
            const command = require(filePath);
            if (command.category == 'fun') funCommands.push({ name: command.data.name, value: command.data.description });
            if (command.category == 'info') infoCommands.push({ name: command.data.name, value: command.data.description });
        }

        if (!category) chosenCategory = sectionEmbed;
        else if (category == 'fun') chosenCategory = funEmbed;
        else if (category == 'info') chosenCategory = infoEmbed;
        else return interaction.reply('Something went wrong, please try again.');

        interaction.reply({ embeds: [chosenCategory], ephemeral: true });
    }
};