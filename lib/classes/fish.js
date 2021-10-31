const { Client } = require('discord.js');
const axios = require('axios').default;

class Fish {
    /**
     * @desciption Anti-Phishing Handler (Fish Detector)
     * @param {Client} client
     * @returns {VoidFunction}
     */
    init(client) {    
        client.on("messageCreate", (message) => {
            if (message.author == client.user) return;
            if (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(message.content.toString()) !== true) return;
            const uAgent = `${client.user.username} (${client.generateInvite({ scopes: ['bot'], permissions: ['SEND_MESSAGES'] })})`;
            const URL = message.content.toString();

            axios({
                "url": "https://anti-fish.bitflow.dev/check",
                "method": "POST",
                "headers": {
                    "User-Agent": uAgent
                },
                "data": {
                    "message": URL
                }
            }).then(function (val) {
                const a = val.data;

                if (a.match) {
                    client.emit("phishingMessage", message, a);
                } else {
                    return;
                };
            }).catch(e => { });
        });
    };
};

module.exports = Fish;