const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')

module.exports = {

    //Command config for command execution  
    config: {
        name: 'delete',
        aliases: [''],
        permissionRank: 2
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        message.delete();

        let amount = args[1];

        if (!amount) return message.reply('Gib eine Anzahl an Nachrichten an, die du löschen willst');
        if (isNaN(amount)) return message.reply('Die Anzahl ist keine Nummer');
        if (amount > 100) return message.reply('Du kannst maximal nur 100 Nachrichten auf einmal löschen');
        if (amount < 1) return message.reply('Du kannst minimal 1 Nachricht löschen');

        await message.channel.messages.fetch({ limit: amount }).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }
} 
