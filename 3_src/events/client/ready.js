const schedule = require('node-schedule');
const f = require('../../functions/functions.js')
const MongoClient = require('mongodb').MongoClient

let url = process.env.url

module.exports = async bot => {
    console.log(`${bot.user.username} is online! \nYou are logged in as ${bot.user.tag}`);

    bot.user.setActivity('?befehle', { type: 'WATCHING' })
    
    let rule = new schedule.RecurrenceRule();
    rule.hour = [5];
    rule.minute = [45];
    rule.dayOfWeek = [1, 2, 3, 4, 5];

    schedule.scheduleJob(rule, () => {

        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {

            db.db('TaoistDB').collection('stundenplan').findOne({ name: 'ControlPanel' }, (err, result) => {

                if (result) {
                    if (result.sendDaily === true) {

                        let date = new Date(Date.now())
                        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())

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
