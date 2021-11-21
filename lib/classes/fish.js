const { Client, version } = require('discord.js');
const axios = require('axios').default;
const ver = version;

class Fish {
    /**
     * @desciption Anti-Phishing Handler (Fish Detector)
     * @param {Client} client Discord.JS Client
     * @param {String} version Discord.JS Version *Default is latest version*
     * @returns {VoidFunction}
     */
    init(client, version) {    
        //To create multi-version support
        if (!version) version = ver; var ev; if (parseFloat(version) < 13) ev = "message"; else ev = "messageCreate";

        
        client.on(ev, (message) => {
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