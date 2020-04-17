const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')
const MongoClient = require('mongodb').MongoClient

let url = process.env.url

module.exports = {

    //Command config for command execution  
    config: {
        name: 'stundenplan',
        aliases: ['sp'],
        permissionRank: 1
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        //Falls keine Jgs angegeben wird => Nachricht an den User
        if (!args[1]) {
            message.channel.send('Sie müssen eine Jahrgangsstufe angeben, um deren Stundenplan zu sehen!')
            return;
        }

        //Alle akzeptierten Jgs
        let jahrgangsstufen = ['5', '6', '7', '8', '9', '10', '11', '12'];
        let jgs;

        //Falls die Jgs nicht akzeptiert wird => Nachricht an den User, sonst => Jgs speichern
        if (!jahrgangsstufen.includes(args[1])) {
            message.channel.send('Diese Jahrgangsstufe gibt es am Werdenfels Gymnasium nicht!')
            return;
        } else {
            jgs = args[1];
        }

        //Falls der User kein Datum angegeben hat => Stundenplan des heutigen Tages, sonst => Stundenplan des angegebenen Datums
        if (!args[2]) {

            //Datum des heutigen Tages erstellen
            let datum = new Date(Date.now())
            datum = new Date(datum.getUTCFullYear(), datum.getUTCMonth(), datum.getUTCDate(), 2)

            //Mit der Datenbank verbinden
            MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {

                //Eintrag mit dem heutigen Datum suchen
                db.db('TaoistDB').collection('stundenplan').findOne({ date: datum }, (err, result) => {
                    if (err) throw err;

                    //Embed Nachricht erstellen
                    let embed = new MessageEmbed()
                        .setColor(color)
                        .setTitle('Stundenplan | ' + jgs)
                        .setFooter(datum.getDate() + '/' + (datum.getMonth() + 1) + '/' + datum.getFullYear())

                    //Falls es keinen Eintrag mit dem heutigen Datum gibt => 'Keine Einträge gefunden' zum Embed hinzufügen 
                    if (!result) {
                        embed.setDescription('Keine Einträge vorhanden')
                    } else {

                        //Falls es einen Eintrag zur angegebenen Jgs gibt => alle Informationen darüber zum Embed hinzufügen, sonst => 'Keine Einträge vorhanden' hinzufügen
                        if (result[jgs] !== undefined) {
                            result[jgs].forEach((x) => {
                                embed.addField(x.time, `Lehrerkraft: ${x.teacher}\nTeilnehmer: ${x.students}\nThema: ${x.subject}`)
                            })
                        } else {
                            embed.setDescription('Keine Einträge vorhanden')
                        }
                    }

                    //Fertigen Stundenplan in den User Kanal schicken
                    message.channel.send(embed)

                })

            })

        } else {

            //Das Datums Argument aufteilen
            let slicedDate = args[2].split('.');

            //Checken, ob es eine gültige Angabe war
            if (slicedDate.length === 3 && !isNaN(slicedDate[0]) && !isNaN(slicedDate[1]) && !isNaN(slicedDate[2])) {

                //Datum erstellen
                slicedDate = new Date(slicedDate[2], slicedDate[1], slicedDate[0]);
                slicedDate = new Date(slicedDate.getUTCFullYear(), slicedDate.getUTCMonth() - 1, slicedDate.getUTCDate(), 2)

                //Mit der Datenbank verbinden
                MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {

                    //Eintrag mit dem angegebenen Datum suchen
                    db.db('TaoistDB').collection('stundenplan').findOne({ date: slicedDate }, (err, result) => {
                        if (err) throw err;

                        //Embed Nachricht erstellen
                        let embed = new MessageEmbed()
                            .setColor(color)
                            .setTitle('Stundenplan | ' + jgs)
                            .setFooter(slicedDate.getDate() + '.' + (slicedDate.getMonth() + 1) + '.' + slicedDate.getFullYear())

                        //Falls es keinen Eintrag mit dem angegebenen Datum gibt => 'Keine Einträge gefunden' zum Embed hinzufügen 
                        if (!result) {
                            embed.setDescription('Keine Einträge vorhanden')
                        } else {

                            //Falls es einen Eintrag zur angegebenen Jgs gibt => alle Informationen darüber zum Embed hinzufügen, sonst => 'Keine Einträge vorhanden' hinzufügen
                            if (result[jgs] !== undefined) {
                                result[jgs].forEach((x) => {
                                    embed.addField(x.time, `Lehrerkraft: ${x.teacher}\nTeilnehmer: ${x.students}\nThema: ${x.subject}`)
                                })
                            } else {
                                embed.setDescription('Keine Einträge vorhanden')
                            }

                        }

                        //Fertigen Stundeplan in den User Kanal schicken
                        message.channel.send(embed)

                    })

                })

                //Fehlernachricht, falls das Datum falsch eingegeben wurde
            } else {
                message.channel.send('Es gab einen Fehler bei Ihrer Eingabe. Das Datum war ungültig. \nGeben Sie das Datum im Format T.M.JJJJ an')
            }

        }
    }
}
