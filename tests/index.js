const { Client } = require('discord.js');
const { Fish } = require('../lib/index'); //fancy imports
const client = new Client({ intents: ['GUILD_MESSAGES', 'GUILDS',] }); //create client, requires guild and guild messages to function.
const fish = new Fish(); //create fish

client.on("phishingMessage", message => {
    message.channel.send(`Phishing link detected by ${message.author}. Clicking this link may put your account at risk.`)
})

fish.init(client); //initialize fishing client, DO THIS BEFORE YOU LOGIN.
client.login('TOKEN'); //login to discord.