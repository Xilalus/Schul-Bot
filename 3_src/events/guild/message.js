const { prefix } = require('../../../2_config/botconfig.json')

module.exports = async (bot, message) => {


    if (message.author.id !== '441641005469532200') {
        return
    }

    //If the message is from the bot or a direct message return
    if (message.author.bot || message.channel.type === "dm") return;

    //Split message into arguments, remove prefix
    let args = message.content.trim().split(' ');

    //If the first argument is not the prefix return
    if (args[0].toLowerCase() != prefix) return;

    //If only the prefix is entered return
    if (args.length < 2) return;

    let commandfile = bot.commands.get(args[1].toLowerCase()) || bot.commands.get(bot.aliases.get(args[1].toLowerCase()));

    if (commandfile) {

        commandfile.run(bot, message, args)

    } else {

        message.channel.send('Kein Befehl wurde gefunden')

    }
}
