const { Client, Collection } = require('discord.js');
const { token } = require('./2_config/botconfig.json');
const bot = new Client();

['commands', 'aliases'].forEach(x => bot[x] = new Collection);
['command', 'events'].forEach(x => require(`./3_src/handlers/${x}`)(bot));

bot.login(process.env.token);
