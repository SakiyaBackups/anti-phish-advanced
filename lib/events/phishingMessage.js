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
    if (message.author == message.client.user) return;
    if (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(message.content.toString()) !== true) return;

    const uAgent = `${client.user.username} (${client.generateInvite({ scopes: ['bot'], permissions: ['SEND_MESSAGES'] })})`;
    const URL = message.content.toString();
    const msg = message;


    try {
        (await axios({
            "url": "https://anti-fish.bitflow.dev/check",
            "method": "POST",
            "headers": {
                "User-Agent": uAgent
            },
            "data": {
                "message": URL
            }
        })).data;
    } catch (e) { makeError("AXIOS_ERROR"); console.error(e) };

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