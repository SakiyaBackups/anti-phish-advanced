const { Client, version } = require('discord.js');
const { Fish } = require('../lib/index'); //fancy imports
const client = new Client({ intents: ['GUILD_MESSAGES', 'GUILDS',] }); //create client, requires guild and guild messages to function.
const fish = new Fish(); //create fish

client.on("phishingMessage", (message, data) => {
    console.log(message, data); //"message" is the Message object containing the link, and "data" is the data returned by the api

    message.channel.send(`Phishing link detected by ${message.author}. Clicking this link may put your account at risk.`);
});

fish.init(client, version); //initialize fishing client, DO THIS BEFORE YOU LOGIN.
client.login('TOKEN'); //login to discord.
