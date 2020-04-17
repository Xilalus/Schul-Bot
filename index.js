const { Client, Collection } = require('discord.js');
const bot = new Client();

['commands', 'aliases'].forEach(x => bot[x] = new Collection);
['command', 'events'].forEach(x => require(`./3_src/handler/${x}`)(bot));

bot.login(token);
