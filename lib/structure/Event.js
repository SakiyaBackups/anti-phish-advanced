const Discord = require("discord.js");
const Fish = require("../classes/Fish");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Fish} client
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function RunFunction(client, ...eventArgs) { }

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {
    /**
     * @param {K} event
     * @param {RunFunction<K>} runFunction
     */
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
    };
};

module.exports = Event;