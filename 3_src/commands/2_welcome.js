const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {

    //Command config for command execution  
    config: {
        name: 'welcome',
        aliases: [''],
        permissionRank: 2
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        var attachment = new MessageAttachment('1_assets/image.png', 'image.png')
        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Werdenfels Gymnasium')
            .addField('Verifizierung', `Um vollen Zugang auf den Server zu erhalten, antworte auf die Nachricht die du erhalten hast`)
            .attachFiles(attachment)
            .setImage('attachment://image.png')

        message.channel.send(embed)

    }
}