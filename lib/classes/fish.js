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
        var ev; var permissions;
        if (!version) version = ver;
        //To create multi-version support
        if (parseFloat(version) < 13) {
            ev = "message";
            permissions = 'SEND_MESSAGES';
        }
        else {
            ev = "messageCreate";
            permissions = 'SendMessages';
        }
        
        client.on(ev, (message) => {
            if (message && message.partial) message.fetch();
            this.checkForFish(client, message, permissions);            
        });

        client.on("messageUpdate", (oldMsg, newMsg) => {
            if (newMsg && newMsg.partial) newMsg.fetch();
            this.checkForFish(client, newMsg, permissions);
        });
    };

    
    /**
     * @description Checks if an exiting link is a phishing link
     * @param {Client} client
     * @param {Message} message
     * @param {String} permissions
     * @returns {VoidFunction}
     */
    checkForFish(client, message, permissions) {
        if (message.author == client.user) return;

        const uAgent = `${client.user.username} (${client.generateInvite({ scopes: ['bot'], permissions: [permissions] })})`;
        const urlCheck = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i;
       
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
