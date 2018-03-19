const { CommandoClient } = require('discord.js-commando');

const bot  = new CommandoClient({
    commandPrefix: '!t.'    
});

/* Player info */
bot.registry.registerGroup('character', 'Character');
/* Guild info */
bot.registry.registerGroup('guild', 'Guild');
/* Item command */
bot.registry.registerGroup('item', 'Item');
/* register default commands */
bot.registry.registerDefaults(); 
/* tell commandor client to load this files */
bot.registry.registerCommandsIn(__dirname + "/commands");


bot.login('Mzg4MTE0OTkyNDYyODIzNDI0.DQoUQQ.E1y743wQQiCGpRwxH8CNmnrpRk0');