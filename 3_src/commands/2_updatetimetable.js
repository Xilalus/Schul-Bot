const { prefix, color } = require('../../2_config/botconfig.json')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const f = require('../functions/functions.js')

module.exports = {

    //Command config for command execution  
    config: {
        name: 'updatettimetable',
        aliases: ['ut'],
        permissionRank: 2
    },

    //Running command
    run: async (bot, message, args, permRank) => {

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
