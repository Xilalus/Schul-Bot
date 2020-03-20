const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {

    //Command config for command execution  
    config: {
        name: 'willkommen',
        aliases: [''],
        description: '',
        usage: `${prefix} `
    },

    //Running command
    run: async (bot, message, args) => {

        var attachment = new MessageAttachment('1_assets/image.jpg', 'image.png')
        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Werdenfels Gymnasium')
            .addField('Verifizierung', `Um vollen Zugang auf den Server zu erhalten, antworte auf die Nachricht die du erhalten hast`)
            .attachFiles(attachment)
            .setImage('attachment://image.png')

        message.delete()

        message.channel.send(embed)

    }
} 