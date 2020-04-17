const { readdirSync } = require("fs");

module.exports = (bot) => {
    const load = () => {
        const commands = readdirSync(`3_src/commands/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../../3_src/commands/${file}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
        };
    };
    load();
};