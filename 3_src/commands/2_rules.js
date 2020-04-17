const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')

module.exports = {

    //Command config for command execution  
    config: {
        name: 'rules',
        aliases: [''],
        permissionRank: 2
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Werdenfels Gymnasium')
            .addField('Regeln',
                `Sehr geehrte Schulfamilie, herzlich Willkommen auf dem offiiziellen Discord Server des Werdenfels Gymnasium's
                
**Für ein geornetes Miteinander sind folgende Regeln zu beachten:**
- Respekt untereinander!
- Kein Spam, CAPS LOCK verwenden oder Werbung posten
- Beleidigungen jeglicher Art sind verboten
- Kein Rassismus, keine Hetze
- Allgemein: Be Fair!
                
**Ansagen der Lehrer und Admin's sind unbedingt folge zu leisten!!!**
Nach dem Motto: "Was du nicht willst, daß man dir tut, das füg' auch keinem anderen zu."
`
            )
        message.channel.send(embed)

    }
} 
