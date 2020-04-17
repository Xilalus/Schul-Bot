const { prefix } = require('../../../2_config/botconfig.json')

module.exports = async (bot, message) => {

    if (message.author.bot || message.channel.type === "dm") return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.content.slice(prefix.length, message.content.length) === "") return;


    let args = message.content.slice(prefix.length, message.content.length).trim().split(" ");
    let commandfile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));


    if (commandfile) {

        let permRank = 0;

        if (commandfile.config.permissionRank) {

            //Schulleitung und Lehrer
            if (message.member.roles.cache.has('690213515356930048') || message.member.roles.cache.has('690204242807488628')) {
                permRank = 1;
            }

            //Admin und Moderator
            if (message.member.roles.cache.has('690201148828942352') || message.member.roles.cache.has('691751146930438205')) {
                permRank = 2;
            }

            if (permRank >= commandfile.config.permissionRank) {
                commandfile.run(bot, message, args, permRank)
            } else {
                message.channel.send('Sie haben keine Berechtigung für diesen Befehl')
            }

        } else {
            commandfile.run(bot, message, args, permRank)
        }
    }
}
