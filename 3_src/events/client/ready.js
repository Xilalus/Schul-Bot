const schedule = require('node-schedule');
const f = require('../../functions/functions.js')
const MongoClient = require('mongodb').MongoClient
const { url } = require('../../../2_config/botconfig.json')

module.exports = async bot => {
    console.log(`${bot.user.username} is online! \nYou are logged in as ${bot.user.tag}`);

    bot.user.setActivity('you!', { type: "WATCHING" });

    schedule.scheduleJob('45 7 1-5 * *', () => {

        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {

            db.db('TaoistDB').collection('stundenplan').findOne({ name: 'ControlPanel' }, (err, result) => {

                if (result) {
                    if (result.sendDaily === true) {

                        let date = new Date(Date.now())
                        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 2)

                        let classes = [
                            ['12', '699980397739638966'],
                            ['11', '699983887346040914'],
                            ['10', '699985921952710657'],
                            ['9', '699993425331617853'],
                            ['8', '699993980271591465'],
                            ['7', '699994186358718474'],
                            ['6', '699994574700937226'],
                            ['5', '699994830109147217']
                        ]

                        classes.forEach(x => {
                            f.sendPlan(x, date, bot)
                        })

                    }
                }
            })
        })
    })
}