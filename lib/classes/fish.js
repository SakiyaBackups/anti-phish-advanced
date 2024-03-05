const { Client, Permissions, version } = require('discord.js');
const axios = require('axios').default;
const ver = version;

class Fish {
    /**
     * @description Anti-Phishing Handler (Fish Detector)
     * @param {Client} client Discord.JS Client
     * @param {String} [version] Discord.JS Version *Default is latest version*
     */
    init(client, version = ver) {
        let ev;
        let permissionsBitfield;

        if (parseFloat(version) < 13) {
            ev = "message";
            permissionsBitfield = Permissions.FLAGS.SEND_MESSAGES;
        } else {
            ev = "messageCreate";
            permissionsBitfield = new Permissions(['SEND_MESSAGES']).bitfield;
        }

        client.on(ev, (message) => {
            if (message.partial) message.fetch();
            this.checkForFish(client, message, permissionsBitfield);
        });

        client.on("messageUpdate", (oldMsg, newMsg) => {
            if (newMsg.partial) newMsg.fetch();
            this.checkForFish(client, newMsg, permissionsBitfield);
        });
    }

    /**
     * @description Checks if an existing link is a phishing link
     * @param {Client} client
     * @param {Message} message
     * @param {BigInt} permissionsBitfield
     */
    checkForFish(client, message, permissionsBitfield) {
        if (message.author === client.user) return;

        const uAgent = `${client.user.username} (${client.generateInvite({ scopes: ['bot', 'applications.commands'], permissions: permissionsBitfield })})`;
        const urlCheck = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i;

        if (!urlCheck.test(message.content)) return;
        const URL = message.content;

        axios({
            url: "https://anti-fish.bitflow.dev/check",
            method: "POST",
            headers: {
                "User-Agent": uAgent
            },
            data: {
                "message": URL
            }
        }).then(function (val) {
            const a = val.data;

            if (a.match) {
                client.emit("phishingMessage", message, a);
            }
        }).catch(e => console.error(e));
    }
}

module.exports = Fish;