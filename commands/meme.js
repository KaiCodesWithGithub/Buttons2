const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { giphyApiKey } = require('../config.json');
const giphy = require('giphy-api')(giphyApiKey);
// const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Replies with image from giphy!')
        .addStringOption(option =>
            option.setName('search-query')
                .setDescription('What GIF you want to search for.')
                .setRequired(true)),
    category: 'fun',
    async execute(interaction) {
        giphy.random({
            tag: interaction.options.getString('search-query')
        }, function (err, res) {
            const memeEmbed = new EmbedBuilder()
                .setTitle(`GIF from giphy with search ${interaction.options.getString('search-query')}:`)
                .setImage(res.data.images.original.url)
                .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` })
                .setColor('Random');
            interaction.reply({ embeds: [memeEmbed] });
        });
    }
};