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

        if (message.channel.id !== '699967540465762356' && permRank < 2) {
            let msg = await message.channel.send('Bitte benutzen Sie für die Befehle den <#699967540465762356> Kanal!')

            message.delete({ timeout: 0 })

            msg.delete({ timeout: 10000 })

            return;
        }

        //Sendet die Befehle, die anhänging von der Rolle auf dem Server, von dem User benutzt werden können
        if (permRank < 2) {

            //Alle Befehle für Schulleitung und Lehrer
            let embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Befehle | Schulleitung/Lehrer')
                .setDescription(`\`${prefix}erstellen\` oder \`${prefix}er\` 
                - Hiermit können Sie einen neuen Stundenplan Eintrag erstellen 
                
                \`${prefix}stundenplan [jgs]\` oder \`${prefix}sp [jgs]\` 
                - Hirmit können Sie den Stundenplan der angegebenen Jahrgangsstufe am aktuellen Tag abrufen (**[jgs]** nur im Zahlenformat z.B. 12)
                
                \`${prefix}stundenplan [jgs] [datum]\` oder \`${prefix}sp [jgs] [datum]\` 
                - Hiermit können Sie den Stundenplan der angegebenen Jahrgangsstufe am aktuellen Tag abrufen (**[jgs]** nur im Zahlenformat z.B. 12, **[datum]** im Format D.M.JJJJ)

                \`${prefix}übersicht [jgs]\`
                - Hiermit können Sie eine Übersicht des Stundenplans der angegebenen Jahrgangsstufe aufrufen. Die Übersicht beginnt am **heutigen Datum** und reicht 4 weitere Tage in die Zukunft (**[jgs]** nur im Zahlenformat z.B. 12)

                \`${prefix}übersicht [jgs] [datum]\`
                - Hiermit können Sie eine Übersicht des Stundenplans der angegebenen Jahrgangsstufe aufrufen. Die Übersicht beginnt an dem **angegebenen Datum** und reicht 4 weitere Tage in die Zukunft (**[jgs]** nur im Zahlenformat z.B. 12, **[datum]** im Format D.M.JJJJ)`)
            message.channel.send(embed)

        } else {

            //Alle Befehle für Admin's und Moderatoren
            let embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Befehle | Admin/Moderator')
                .setDescription(`\`${prefix}erstellen\` oder \`${prefix}er\` 
                - Hiermit können Sie einen neuen Stundenplan Eintrag erstellen 
                
                \`${prefix}stundenplan [jgs]\` oder \`${prefix}sp [jgs]\` 
                - Hirmit können Sie den Stundenplan der angegebenen Jahrgangsstufe am aktuellen Tag abrufen (**[jgs]** nur im Zahlenformat z.B. 12)
                
                \`${prefix}stundenplan [jgs] [datum]\` oder \`${prefix}sp [jgs] [datum]\` 
                - Hiermit können Sie den Stundenplan der angegebenen Jahrgangsstufe am aktuellen Tag abrufen (**[jgs]** nur im Zahlenformat z.B. 12, **[datum]** im Format D.M.JJJJ)

                \`${prefix}übersicht [jgs]\`
                - Hiermit können Sie eine Übersicht des Stundenplans der angegebenen Jahrgangsstufe aufrufen. Die Übersicht beginnt am **heutigen Datum** und reicht 4 weitere Tage in die Zukunft (**[jgs]** nur im Zahlenformat z.B. 12)

                \`${prefix}übersicht [jgs] [datum]\`
                - Hiermit können Sie eine Übersicht des Stundenplans der angegebenen Jahrgangsstufe aufrufen. Die Übersicht beginnt an dem **angegebenen Datum** und reicht 4 weitere Tage in die Zukunft (**[jgs]** nur im Zahlenformat z.B. 12, **[datum]** im Format D.M.JJJJ)
                
                \`${prefix}updatetimetable\` oder \`${prefix}ut\`
                - Hiermit werden alle heutigen Stundenpläne in die Kanäle dafür geschickt
                
                \`${prefix}toggledaily [on/off]\` oder \`${prefix}td [on/off]\`
                - Hiermit können die täglichen Stundenplan-Nachrichten an- bzw. ausgestellte werden
                
                \`${prefix}rules\`
                - Schickt die Regeln des Server als Embed
                
                \`${prefix}welcome\`
                - Schickt die Willkommensnachricht als Embed

                \`${prefix}delete [anzahl]\` oder \`${prefix}d [anzahl]\`
                - Hiermit kann eine bestimmte Anzahl (max 100) an Nachrichten gelöscht werden`)
            message.channel.send(embed)
        }
    }
} 
