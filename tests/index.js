const { Client } = require('discord.js'); //import client
const client = new Client({ intents: ['GUILD_MESSAGES', 'GUILDS',] }); //create client, apparently w/o those intents, it wont work
const Fish = require('../lib/index'); //import fish
const asdf = new Fish();



asdf.on('ready', () => {
    console.log('hi')
});


asdf.emit("phishingMessage", async (message, data) => {
    console.log(message, data);
});

asdf.start('TOKEN')