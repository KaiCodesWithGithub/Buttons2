const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Run calculations.')
        .addIntegerOption(option =>
            option.setName('first-value')
                .setDescription('Your first number in the equation.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('operation')
                .setDescription('+, -, ÷ or ×')
                .addChoices(
                    { name: '+', value: '+' },
                    { name: '-', value: '-' },
                    { name: '÷', value: '/' },
                    { name: '×', value: '*' }
                )
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('second-value')
                .setDescription('Your second number in the equation')
                .setRequired(true)
        ),
    category: 'fun',
    async execute(interaction) {
        const firstValue = interaction.options.getInteger('first-value');
        const operation = interaction.options.getString('operation');
        const secondValue = interaction.options.getInteger('second-value');
        let result;
        let operationSymbol;

        if (operation == '+') {
            result = firstValue + secondValue;
            operationSymbol = '+';
        }

        if (operation == '-') {
            result = firstValue - secondValue;
            operationSymbol = '-';
        }

        if (operation == '*') {
            result = firstValue * secondValue;
            operationSymbol = '÷';
        }

        if (operation == '/') {
            result = firstValue / secondValue;
            operationSymbol = '×';
        }

        const calcEmbed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s equation:`)
            .setDescription(`${firstValue} ${operationSymbol} ${secondValue} = ${result}`)
            .setColor('Random')
            .setAuthor({ name: interaction.user.username, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256` });
        await interaction.reply({ embeds: [calcEmbed] });
    }
};