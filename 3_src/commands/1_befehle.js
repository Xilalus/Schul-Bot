const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')

module.exports = {

    //Command config for command execution  
    config: {
        name: 'befehle',
        aliases: [''],
        permissionRank: 1
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        //Sendet die Befehle, die anhänging von der Rolle auf dem Server, von dem User benutzt werden können
        if (permRank < 2) {

            //Alle Befehle für Schulleitung und Lehrer
            let embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Befehle | Lehrer')
                .setDescription('`?erstellen` oder `?er` \n- Hiermit können Sie einen neuen Stundenplan Eintrag erstellen\n \n`?stundenplan [jgs]` oder `?sp [jgs]` \n- Hiermit können Sie den Stundenplan der angegebenen Jahrgangstufe am aktuellen Tag aufrufen (`[jsg]` nur in Zahlenformat z.B. 11)\n \n`?stundeplan [jgs] [datum]` oder `?sp [jgs] [datum]` \n- Hiermit können Sie den Stundenplan der angegebenen Jahrgangstufe am angegebenen Tag aufrufen (`[jgs]` nur in Zahlenformat z.B. 11, `[datum]` im Format D.M.JJJJ) ')
            message.channel.send(embed)

        } else {

            //Alle Befehle für Admin's und Moderatoren
            let embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Befehle | Admin/Moderator')
                .setDescription('`?erstellen` oder `?er` \n- Hiermit können Sie einen neuen Stundenplan Eintrag erstellen\n \n`?stundenplan [jgs]` oder `?sp [jgs]` \n- Hiermit können Sie den Stundenplan der angegebenen Jahrgangstufe am aktuellen Tag aufrufen (`[jsg]` nur in Zahlenformat z.B. 11)\n \n`?stundeplan [jgs] [datum]` oder `?sp [jgs] [datum]` \n- Hiermit können Sie den Stundenplan der angegebenen Jahrgangstufe am angegebenen Tag aufrufen (`[jgs]` nur in Zahlenformat z.B. 11, `[datum]` im Format D.M.JJJJ)\n \n`?updatetimetable` oder `?ut` \n- Hiermit werden alle heutigen Stundenpläne in die Kanäle dafür geschickt \n \n `?toggledaily [on/off]` oder `?td [on/off]` \n- Hiermit können die täglichen Stundenplan Nachrichten an- bzw. ausgestellt werden \n \n`?rules` \n- Schickt die Regeln des Servers als Embed \n \n`?welcome` - Schickt die Willkommensnachricht als Embed \n \n`?delete [anzahl]` oder `?d [anzahl]` \n- Hiermit können Sie eine bestimmte Anzahl an Nachrichten löschen ')
            message.channel.send(embed)

        }
    }
} 
