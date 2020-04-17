const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed } = require('discord.js')
const MongoClient = require('mongodb').MongoClient;

let url = process.env.url

module.exports = {

    //Command config for command execution  
    config: {
        name: 'toggledaily',
        aliases: ['td'],
        permissionRank: 2
    },

    //Running command
    run: async (bot, message, args, permRank) => {

        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {




            if (!args[1]) {

                db.db('TaoistDB').collection('stundenplan').findOne({ name: 'ControlPanel' }, (err, result) => {
                    if (err) throw err;

                    if (result) {
                        if (result.sendDaily === true) {
                            message.channel.send('Tägliche Stundenplan Nachrichten sind **an**')
                        } else {
                            message.channel.send('Tägliche Stundenplan Nachrichten sind **aus**')
                        }
                    } else {
                        message.channel.send('Diese Einstellung wurde noch nicht festgelegt. Gebe `!td [on/off]` ein, um diese Einstellung festzulegen.')
                    }
                })

            } else {

                db.db('TaoistDB').collection('stundenplan').findOne({ name: 'ControlPanel' }, (err, result) => {
                    if (err) throw err;

                    let sendDaily;
                    let msg;
                    if (args[1] === 'on') {
                        sendDaily = true;
                        msg = 'Tägliche Stundenplan Nachrichten sind **an**';
                    } else if (args[1] === 'off') {
                        sendDaily = false;
                        msg = 'Tägliche Stundenplan Nachrichten sind **aus**';
                    } else {
                        message.channel.send('Das ist kein gültiger Zustand dieser Einstellung')
                        return;
                    }

                    if (result) {

                        db.db('TaoistDB').collection('stundenplan').updateOne({ name: 'ControlPanel' }, { $set: { sendDaily: sendDaily } }, (err) => {
                            if (err) throw err;
                            message.channel.send(msg)
                        })

                    } else {

                        let entry = {
                            name: 'ControlPanel',
                            sendDaily: sendDaily
                        }

                        db.db('TaoistDB').collection('stundenplan').insertOne(entry, (err, res) => {
                            if (err) throw err;
                            message.channel.send(msg)
                        })
                    }
                })
            }
        })
    }
} 
