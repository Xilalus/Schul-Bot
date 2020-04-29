const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')
const f = require('../functions/functions.js')
const MongoClient = require('mongodb').MongoClient;

let url = process.env.url

module.exports = {

    //Command config for command execution  
    config: {
        name: 'erstellen',
        aliases: ['er'],
        permissionRank: 1
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        //Eingabe der Jahrgangsstufe
        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Jahrgangsstufe')
            .setDescription('Geben Sie die Jahrgangsstufe in Zahlenformat an \nZum Beispiel: `12` \n \nWährend dem ganzen Erstellungsprozess können Sie auf die Fragen des Bots mit `abbrechen` antworten, um den Erstellungsprozess abzubrechen.')
        let msg = await message.channel.send(embed)

        let jahrgangsstufen = ['5', '6', '7', '8', '9', '10', '11', '12'];
        let jgs;
        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === message.author.id, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).catch(() => { });
            if (!collect) {
                message.reply('Ihre Erstellungsanfrage ist nach 60 Sekunden abgelaufen. Geben Sie erneut `?erstellen` ein, um neu zu beginnen.');
                return;
            } else {
                if (collect.size) {
                    if (collect.first().content.trim().toLowerCase() === 'abbrechen') {
                        message.reply('Ihre Erstellungsanfrage wurde erfolgreich abgebrochen!');
                        return;
                    } else if (jahrgangsstufen.includes(collect.first().content)) {
                        jgs = collect.first().content
                        break;
                    } else {
                        message.channel.send('Diese Jahrgangsstufe gibt es am Werdenfels Gymnasium nicht \nGeben Sie eine anderer Jahrgangsstufe an')
                    }
                }
            }
        }

        //Eingabe des Datums
        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Datum')
            .setDescription('Geben Sie das Datum Ihrer Unterrichtsstunde im Format T.M.JJJJ an \nZum Beispiel: `13.4.2020`')
        msg = await message.channel.send(embed)

        let datum;
        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === message.author.id, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).catch(() => { });
            if (!collect) {
                message.reply('Ihre Erstellungsanfrage ist nach 60 Sekunden abgelaufen. Geben Sie erneut `?erstellen` ein, um neu zu beginnen.');
                return;
            } else {
                if (collect.size) {
                    let slicedDate = collect.first().content.split('.');
                    if (collect.first().content.trim().toLowerCase() === 'abbrechen') {
                        message.reply('Ihre Erstellungsanfrage wurde erfolgreich abgebrochen!');
                        return;
                    } else if (slicedDate.length === 3 && !isNaN(slicedDate[0]) && !isNaN(slicedDate[1]) && !isNaN(slicedDate[2])) {

                        datum = slicedDate;
                        slicedDate = new Date(slicedDate[2], slicedDate[1], slicedDate[0]);
                        slicedDate = new Date(slicedDate.getUTCFullYear(), slicedDate.getUTCMonth() - 1, slicedDate.getUTCDate())

                        let date = new Date(Date.now())
                        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7)

                        let currentDate = new Date(Date.now())
                        currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate())

                        if (slicedDate <= date) {
                            if (slicedDate < currentDate) {
                                message.channel.send('Sie können Stunden nicht in der Vergangenheit eintragen. Bitte geben Sie ein Datum im Format T.M.JJJJ an, was noch bevorsteht.')
                            } else {
                                break;
                            }
                        } else {
                            message.channel.send('Sie können nur bis zu 7 Tage im Voraus Stunden eintragen. Bitte geben Sie ein Datum im Format T.M.JJJJ an, was sich in diesem Zeitfenster befindet.')
                        }

                    } else {
                        message.channel.send('Es gab einen Fehler bei Ihrer Eingabe. Das Datum war ungültig. \nGeben Sie das Datum im Format T.M.JJJJ an')
                    }
                }
            }
        }

        //Eingabe der Uhrzeit
        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Uhrzeit')
            .setDescription('Geben Sie die Uhrzeit Ihrer Unterrichtsstunde im 24 Stunden Format an \nZum Beispiel: `8:30` oder `18:00`')
        msg = await message.channel.send(embed)

        let uhrzeit;
        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === message.author.id, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).catch(() => { });
            if (!collect) {
                message.reply('Ihre Erstellungsanfrage ist nach 60 Sekunden abgelaufen. Geben Sie erneut `?erstellen` ein, um neu zu beginnen.');
                return;
            } else {
                if (collect.size) {
                    let slicedTime = collect.first().content.split(':');
                    if (collect.first().content.trim().toLowerCase() === 'abbrechen') {
                        message.reply('Ihre Erstellungsanfrage wurde erfolgreich abgebrochen!');
                        return;
                    } else if (slicedTime.length === 2 && !isNaN(slicedTime[0]) && !isNaN(slicedTime[1])) {
                        uhrzeit = slicedTime;
                        break;
                    } else {
                        message.channel.send('Es gab einen Fehler bei Ihrer Eingabe. Die Uhrzeit war ungültig. \nGeben Sie die Uhrzeit im 24 Stunden Format an')
                    }
                }
            }
        }

        //Eingabe der Teilnehmer
        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Teilnehmer')
            .setDescription('Geben Sie die Teilnehmer Ihrer Unterrichtsstunde an \nZum Beispiel: `5a` oder `Mathe Kurs von Max Mustermann`')
        msg = await message.channel.send(embed)

        let teilnehmer;
        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === message.author.id, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).catch(() => { });
            if (!collect) {
                message.reply('Ihre Erstellungsanfrage ist nach 60 Sekunden abgelaufen. Geben Sie erneut `?erstellen` ein, um neu zu beginnen.');
                return;
            } else {
                if (collect.size) {
                    if (collect.first().content.trim().toLowerCase() === 'abbrechen') {
                        message.reply('Ihre Erstellungsanfrage wurde erfolgreich abgebrochen!');
                        return;
                    } else {
                        teilnehmer = collect.first().content;
                        break;
                    }
                }
            }
        }

        //Eingabe des Themas
        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Thema')
            .setDescription('Geben Sie das Thema Ihrer Unterrichtsstunde an \nZum Beispiel: `Fragestunde zu den Aufgaben XY`')
        msg = await message.channel.send(embed)

        let thema;
        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === message.author.id, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).catch(() => { });
            if (!collect) {
                message.reply('Ihre Erstellungsanfrage ist nach 60 Sekunden abgelaufen. Geben Sie erneut `?erstellen` ein, um neu zu beginnen.');
                return;
            } else {
                if (collect.size) {
                    if (collect.first().content.trim().toLowerCase() === 'abbrechen') {
                        message.reply('Ihre Erstellungsanfrage wurde erfolgreich abgebrochen!');
                        return;
                    } else {
                        thema = collect.first().content;
                        break;
                    }
                }
            }
        }

        //Rückfrage an den User
        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Bestätigung')
            .setDescription(`Ihr Stundenplaneintrag für die ${jgs}te am ${datum.join('.')} sieht wie folgt aus:`)
            .addField(uhrzeit.join(':'), `**Lehrkraft:** ${message.member.displayName}\n**Teilnehmer:** ${teilnehmer}\n**Thema:** ${thema}`)
            .addField('\u200B', 'Klicken Sie auf\n \n✅ um den Eintrag zu erstellen\n❌ um den Eintrag zu verwerfen')
        msg = await message.channel.send(embed)

        const reactions = ["✅", "❌"];
        for (const react of reactions) {
            await msg.react(react);
        }
        while (true) {
            const filter = (reaction, user) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && user.id !== bot.user.id && user.id === message.author.id;
            };
            const collect = await msg.awaitReactions(
                filter, { time: 60000, max: 1 })
                .catch(() => { });
            if (!collect.size) {
                message.reply('Ihre Erstellungsanfrage ist nach 60 Sekunden abgelaufen. Geben Sie erneut `?erstellen` ein, um neu zu beginnen.');
                msg.reactions.removeAll()
                return;
            } else {
                
                if (collect.first().emoji.name === '✅') {
                    message.reply('Ihr Stundenplaneintrag wurde erfolgreich erstellt!')
                    msg.reactions.removeAll()
                    break;
                } else if (collect.first().emoji.name === '❌') {
                    msg.reactions.removeAll()
                    message.reply('Ihre Erstellungsanfrage wurde erfolgreich abgebrochen!')
                    return;
                }
            }
        }

        //Umformung der jgs
        jgs = f.intToString(jgs);

        //Datum erstellen
        datum = new Date(datum[2], datum[1], datum[0]);
        datum = new Date(datum.getUTCFullYear(), datum.getUTCMonth() - 1, datum.getUTCDate())

        //Vergleichsdatum erstellen
        let currentDate = new Date(Date.now())
        currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate())

        //Stunden Onjekt erstellen
        let eintrag = {
            time: uhrzeit.join(':'),
            teacher: message.member.displayName,
            students: teilnehmer,
            subject: thema
        }

        //Getting the array from the database
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {

            db.db('TaoistDB').collection('stundenplan').findOne({ date: datum }, (err, result) => {

                if (err) throw err;

                if (!result) {

                    let array = [];
                    array.push(eintrag)

                    let entry = {
                        date: datum,
                        [jgs]: array
                    }

                    if (datum.getTime() === currentDate.getTime()) {
                        f.sendUpdate(jgs, array, currentDate, bot)
                    }

                    db.db('TaoistDB').collection('stundenplan').insertOne(entry, (err, res) => {
                        if (err) {
                            throw err;
                        }
                    })

                } else {

                    let array = [];

                    if (result[jgs]) {
                        array = result[jgs]
                    }

                    array.push(eintrag);

                    array.sort(function (a, b) {
                        let atime = a.time.split(':');
                        atime = atime.join('')

                        let btime = b.time.split(':');
                        btime = btime.join('')

                        return parseInt(atime) - parseInt(btime)
                    })

                    if (datum.getTime() === currentDate.getTime()) {
                        f.sendUpdate(jgs, array, currentDate, bot)
                    }

                    db.db('TaoistDB').collection('stundenplan').updateOne({ date: datum }, { $set: { [jgs]: array } }, (err) => {
                        if (err) throw err;
                    })
                }
            })
        })
    }
} 
