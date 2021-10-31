const { Message } = require('discord.js');
const makeError = require('../structure/Error');
const Event = require('../structure/Event');

/**
 * 
 * @param {Message} message 
 * @param {Object} data 
 * @returns 
 */

module.exports = new Event("phishingMessage", async (client, message, data) => {
    

    const d = (await axios({
        "url": "https://anti-fish.bitflow.dev/check",
        "method": "POST",
        "headers": {
            "User-Agent": uAgent
        },
        "data": {
            "message": URL
        }
    })).data;

    return [msg, d];
});