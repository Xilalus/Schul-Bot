const { readdirSync } = require("fs");

module.exports = (bot) => {
    const loadsubfolders = dirs => {
        const subfolders = readdirSync(`3_src/commands/${dirs}/`).filter(folder => folder.endsWith('='));
        for (let folder of subfolders) {
            let commands = readdirSync(`3_src/commands/${dirs}/${folder}/`).filter(file => file.endsWith('.js'));
            for (let file of commands) {
                let pull = require(`../../3_src/commands/${dirs}/${folder}/${file}`);
                bot.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
            };
        }
    };

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