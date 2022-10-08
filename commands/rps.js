const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock Paper Scissors with me!')
        .addStringOption(option =>
            option.setName('rps-choice')
                .setDescription('Choose Rock, Paper or Scissors!')
                .setRequired(true)
                .addChoices(
                    { name: 'Rock', value: 'rock' },
                    { name: 'Paper', value: 'paper' },
                    { name: 'Scissors', value: 'scissors' }
                )),
    category: 'fun',
    async execute(interaction) {
        const botChoice = Math.floor(Math.random() * 2) + 1;
        const playerChoice = interaction.options.getString('rps-choice');
        let botEmoji;
        let playerEmoji;
        let botChoiceStr;
        let winner;

        if (botChoice == 1) {
            botChoiceStr = 'rock';
            botEmoji = ':rock: Rock';
        }
        if (botChoice == 2) {
            botChoiceStr = 'paper';
            botEmoji = ':newspaper: Paper';
        }
        if (botChoice == 1) {
            botChoiceStr = 'scissors';
            botEmoji = ':scissors: Scissors';
        }

        if (playerChoice == 'rock') playerEmoji = ':rock: Rock';
        if (playerChoice == 'paper') playerEmoji = ':newspaper: Paper';
        if (playerChoice == 'scissors') playerEmoji = ':scissors: Scissors';

        if (playerChoice == 'rock') {
            if (botChoiceStr == 'paper') winner = 'I won';
            else winner = 'You won';
        } else if (playerChoice == 'paper') {
            if (botChoiceStr == 'scissors') winner = 'I won';
            else winner = 'You won';
        } else if (playerChoice == 'scissors') {
            if (botChoiceStr == 'rock') winner = 'I won';
            else winner = 'You won';
        }

        if (botChoiceStr == playerChoice) winner = 'We tied';

        const rpsEmbed = new EmbedBuilder()
            .setTitle('RPS')
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` })
            .addFields(
                { name: 'I picked:', value: `${botEmoji}`, inline: true },
                { name: 'You picked:', value: `${playerEmoji}`, inline: true },
                { name: `${winner}`, value: `ㅤ` }
            )
            .setColor('Random');

        await interaction.reply({ embeds: [rpsEmbed] });
    }
};