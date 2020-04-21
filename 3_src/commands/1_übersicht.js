const { color} = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')
const MongoClient = require('mongodb').MongoClient;

let url = process.env.url

module.exports = {

    //Command config for command execution  
    config: {
        name: 'übersicht',
        aliases: [''],
        permissionRank: 1
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        if (!args[1]) {
            message.channel.send('Bitte geben Sie eine Jahrgangsstufe im Zahlenformat an!')
            return;
        }

        let jahrgangsstufen = ['5', '6', '7', '8', '9', '10', '11', '12'];
        let jgs;
        if (jahrgangsstufen.includes(args[1])) {
            jgs = args[1];
        } else {
            message.channel.send('Diese Jahrgangsstufe gibt es am Werdenfels-Gymnasium nicht!')
            return;
        }

        let array = [];
        if (!args[2]) {

            let date = new Date(Date.now())
            for (i = 0; i < 5; i++) {
                let cdate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + i)
                array.push(cdate)
            }

        } else {

            let datum = args[2]
            datum = datum.trim().split('.')
            if (datum.length !== 3 || isNaN(datum[0]) || isNaN(datum[1]) || isNaN(datum[2])) {
                message.channel.send('Bitte geben Sie ein gültiges Datum im Format T.M.JJJJ an')
                return
            }

            let date = new Date(datum[2], datum[1], datum[0])
            for (i = 0; i < 5; i++) {
                let cdate = new Date(date.getUTCFullYear(), date.getUTCMonth() - 1, date.getUTCDate() + i)
                array.push(cdate)
            }

        }

        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, async function (err, db) {

            const cursor = db.db('TaoistDB').collection('stundenplan').find({ 'date': { $in: array } })
            let list = await cursor.toArray()
            list.sort((a, b) => {
                return a.date.getTime() - b.date.getTime()
            })

            let embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Stundenplan Übersicht | ' + jgs)

            for (i = 0; i < 5; i++) {

                let o = list.find(x => { return x.date.getTime() === array[i].getTime() })

                if (!o) {
                    o = {
                        date: array[i]
                    };
                }

                let description = '';
                if (o[jgs]) {
                    o[jgs].forEach((x) => {
                        description = description + `**${x.time}** - ${x.teacher} \n`
                    })
                } else {
                    description = '❌'
                }

                let Wochentag;
                switch (o.date.getDay()) {
                    case 0:
                        Wochentag = 'Sonntag';
                        break;
                    case 1:
                        Wochentag = 'Montag';
                        break;
                    case 2:
                        Wochentag = 'Dienstag';
                        break;
                    case 3:
                        Wochentag = 'Mittwoch';
                        break;
                    case 4:
                        Wochentag = 'Donnerstag';
                        break;
                    case 5:
                        Wochentag = 'Freitag';
                        break;
                    case 6:
                        Wochentag = 'Samstag';
                        break;
                    default:
                        Wochentag = '';
                        break;
                }

                embed.addField(Wochentag + ', ' + o.date.getDate() + '.' + (o.date.getMonth() + 1) + '.' + o.date.getFullYear(), description)

            }
            message.channel.send(embed)
        })
    }
} 
