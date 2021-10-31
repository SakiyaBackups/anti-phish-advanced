const makeError = require('../structure/Error');
const { Client, Intents } = require('discord.js');
const fs = require('fs');


class Fish extends Client {

    /**
     * @description Anti-Phishing Fish Client
     * @param {Object} options Client Options
     * @param {Intents} options.intents Client Intents
     * @returns {Fish} Fish
     */
    constructor(options = {}) {
        if (!options.intents || !options.intents instanceof Intents) options.intents = ["GUILDS", "GUILD_MESSAGES"];

        super({
            intents: options.intents,
            partials: ["MESSAGE", "USER"]
        });
    };


    /**
     * Starts up Discord Client with Fish Implementation
     * @param {String} token Client Token
     */
    start(token) {
        fs.readdirSync("./lib/events")
            .filter(file => file.endsWith(".js")) //Again, a filter that filters non-js files
            .forEach(file => {
                /**
                 * @type {Event}
                 */
                const eventFunc = require(`../events/${file}`); //Calls on event
                const eventName = file.split(".")[0]; //Splits event name and "js"

                this.on(eventName, (...args) => eventFunc.run(this, ...args)); //Makes the events *run*
            });

        this.login(token);
    };
};

module.exports = Fish;