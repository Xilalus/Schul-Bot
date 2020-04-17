const { prefix, color, url } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')
const MongoClient = require('mongodb').MongoClient;

var functions = {

    handleVerification: async function (bot, member) {


        var embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Anmeldung zum offiziellen Werdenfels-Gymnasium Discord Server')
            .setDescription('In welcher Jahrgangsstufe bist du? \nAntworte mir hier in diesem Chat mit deiner Jahrgangsstufe! Zum Beispiel **8**')

        let msg;

        try {
            msg = await member.user.send(embed)
        } catch (err) {
            if (err) {
                let anfrage_channel = bot.channels.cache.find(channel => channel.id === '690572261131943967')
                anfrage_channel.send('Der Benutzer `' + member.user.username + '` hatte ein Problem bei der Verifikation\nVerifikation muss manuell gehandhabt werden')
                return
            }
        }

        let classes = ['5', '6', '7', '8', '9', '10', '11', '12', 'Q11', 'Q12', 'Lehrer', 'Elternbeirat'];
        let cls;

        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === member.user.id, {
                max: 1,
                time: 10000,
                errors: ['time']
            }).catch(() => { });

            if (!collect) {

            } else {

                if (collect.size) {

                    if (classes.includes(collect.first().content)) {
                        cls = collect.first().content
                        break;
                    } else {
                        member.user.send('Diese Jahrgangsstufe gibt es am Werdenfels Gymnasium nicht \nGib deine Jahrgangsstufe an')
                    }

                }

            }

        }

        var embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Du bist aus der Klasse ' + cls)
            .setDescription('Wie heißt du?\nBitte gebe deinen Vor- und Nachnamen an! Zum Beispiel **Max Mustermann**')
        msg = await member.user.send(embed)

        let nick;

        while (true) {
            const collect = await msg.channel.awaitMessages(response => response.author.id === member.user.id, {
                max: 1,
                time: 10000,
                errors: ['time']
            }).catch(() => { });

            if (!collect) {

            } else {

                if (collect.size) {

                    nick = collect.first().content;
                    if (nick.length < 33) {

                        break;

                    } else {

                        user.send('Dein Name kann leider nicht länger als 32 Zeichen sein. Bitte kürze deinen Namen ab!')

                    }

                }

            }

        }

        member.setNickname(nick)

        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Anfrage an die Administratoren geschickt... Warte bis dir der Zugang gewärt wird')

        member.user.send(embed)

        let anfrage_channel = bot.channels.cache.find(channel => channel.id === '690572261131943967')

        let info = new MessageEmbed()
            .setColor(color)
            .setTitle('Beitrittsanfrage')
            .setDescription('**Benutzername:** ' + member.user.username + '\n**Nick:** ' + nick + '\n**Jahrgangsstufe:** ' + cls)
        msg = await anfrage_channel.send(info)

        const reactions = ["✅", "❌"];

        //React to inventory embed message
        for (const react of reactions) {
            await msg.react(react);
        }

        while (true) {

            const filter = (reaction, user) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && user.id !== bot.user.id;
            };

            const collect = await msg.awaitReactions(
                filter, { time: 20000, max: 1 })
                .catch(() => { });
            if (!collect) {

            } else {

                if (collect.size) {

                    if (collect.first().emoji.name === '✅') {

                        msg.delete()
                        break;

                    } else if (collect.first().emoji.name === '❌') {

                        msg.delete()
                        return;

                    }

                }

            }

        }

        let guild_role;
        switch (cls) {
            case '5':
                guild_role = member.guild.roles.cache.find(role => role.id === '690515833793019954')
                break;
            case '6':
                guild_role = member.guild.roles.cache.find(role => role.id === '690516100332388353')
                break;
            case '7':
                guild_role = member.guild.roles.cache.find(role => role.id === '690516125317857281')
                break;
            case '8':
                guild_role = member.guild.roles.cache.find(role => role.id === '690516153075892276')
                break;
            case '9':
                guild_role = member.guild.roles.cache.find(role => role.id === '690516217512984608')
                break;
            case '10':
                guild_role = member.guild.roles.cache.find(role => role.id === '690516254695620698')
                break;
            case '11':
            case 'Q11':
                guild_role = member.guild.roles.cache.find(role => role.id === '690209136050438165')
                break;
            case '12':
            case 'Q12':
                guild_role = member.guild.roles.cache.find(role => role.id === '690203934148919445')
                break;
            case 'Lehrer':
                guild_role = member.guild.roles.cache.find(role => role.id === '690204242807488628')
                break;
            case 'Elternbeirat':
                guild_role = member.guild.roles.cache.find(role => role.id === '690875417858408468')
                break;
        }

        member.roles.add(guild_role.id)

        admin_confirmation = await anfrage_channel.send('Dem Benutzer ' + member.user.username + ' wurde erfolgreich die Rolle ' + guild_role.name + ' hinzugefügt')

        embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Du hast nun vollen Zugang zum Server')
        member.user.send(embed)

    },

    intToString: function (int) {
        switch (int) {
            case 5:
                int = 'five';
                break;
            case 6:
                int = 'six';
                break;
            case 7:
                int = 'seven';
                break;
            case 8:
                int = 'eight';
                break;
            case 9:
                int = 'nine';
                break;
            case 10:
                int = 'ten';
                break;
            case 11:
                int = 'eleven';
                break;
            case 12:
                int = 'twelve';
                break;
        }
        return int;
    },

    sendUpdate: function (jgs, array, date, bot) {
        let table = {
            5: '699994830109147217',
            6: '699994574700937226',
            7: '699994186358718474',
            8: '699993980271591465',
            9: '699993425331617853',
            10: '699985921952710657',
            11: '699983887346040914',
            12: '699980397739638966'
        }

        let mention;
        switch (jgs) {
            case '5':
                mention = '<@&690515833793019954>';
                break;
            case '6':
                mention = '<@&690516100332388353>';
                break;
            case '7':
                mention = '<@&690516125317857281>';
                break;
            case '8':
                mention = '<@&690516153075892276>';
                break;
            case '9':
                mention = '<@&690516217512984608>';
                break;
            case '10':
                mention = '<@&690516254695620698>';
                break;
            case '11':
                mention = '<@&690209136050438165>';
                break;
            case '12':
                mention = '<@&690203934148919445>';
                break;
            default:
                mention = '<@&690201148828942352>'

        }

        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Stundenplan | Update | ' + jgs)
            .setFooter(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear())
        array.forEach((x) => {
            embed.addField(x.time, `Lehrerkraft: ${x.teacher}\nTeilnehmer: ${x.students}\nThema: ${x.subject}`)
        })

        bot.channels.cache.get(table[jgs]).send(mention)
        bot.channels.cache.get(table[jgs]).send(embed)

    },

    sendPlan: function (array, date, bot) {
        let jgs = array[0];
        let channel = array[1];

        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {

            db.db('TaoistDB').collection('stundenplan').findOne({ date: date }, (err, result) => {
                if (err) throw err;

                let embed = new MessageEmbed()
                    .setColor(color)
                    .setTitle('Stundenplan | ' + jgs)
                    .setFooter(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear())

                if (!result) {
                    embed.setDescription('Keine Einträge vorhanden')
                } else {
                    if (result[jgs] !== undefined) {
                        result[jgs].forEach((x) => {
                            embed.addField(x.time, `Lehrerkraft: ${x.teacher}\nTeilnehmer: ${x.students}\nThema: ${x.subject}`)
                        })
                    } else {
                        embed.setDescription('Keine Einträge vorhanden')
                    }
                }

                let mention;
                switch (jgs) {
                    case '5':
                        mention = '<@&690515833793019954>';
                        break;
                    case '6':
                        mention = '<@&690516100332388353>';
                        break;
                    case '7':
                        mention = '<@&690516125317857281>';
                        break;
                    case '8':
                        mention = '<@&690516153075892276>';
                        break;
                    case '9':
                        mention = '<@&690516217512984608>';
                        break;
                    case '10':
                        mention = '<@&690516254695620698>';
                        break;
                    case '11':
                        mention = '<@&690209136050438165>';
                        break;
                    case '12':
                        mention = '<@&690203934148919445>';
                        break;
                    default:
                        mention = '<@&690201148828942352>'

                }

                bot.channels.cache.get(channel).send(mention)
                bot.channels.cache.get(channel).send(embed)

            })

        })
    }
}

module.exports = functions;