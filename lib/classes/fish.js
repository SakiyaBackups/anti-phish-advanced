const { Client, Message, version } = require('discord.js');
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
        if (!version) version = ver; var ev; if (parseFloat(version) < 13) ev = "message"; else ev = "messageCreate";  //To create multi-version support
        
        client.on(ev, (message) => {
            if (message.partial) message.fetch()
            this.checkForFish(client, message);            
        });

        client.on("messageUpdate", (oldMsg, newMsg) => {
            if (message.partial) message.fetch()
            this.checkForFish(client, newMsg);
        });
    };

    
    /**
     * @description Checks if an exiting link is a phishing link
     * @param {Client} client 
     * @param {Message} message 
     * @returns {VoidFunction}
     */
    checkForFish(client, message) {
        if (message.author == client.user) return;

        const uAgent = `${client.user.username} (${client.generateInvite({ scopes: ['bot'], permissions: ['SEND_MESSAGES'] })})`;
        const urlCheck = /(?:[A-z0-9](?:[A-z0-9-]{0,61}[A-z0-9])?\.)+[A-z0-9][A-z0-9-]{0,61}[A-z0-9]/;
       
        if (urlCheck.test(message.content.toString()) !== true) return;
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
    };
};

module.exports = Fish;
