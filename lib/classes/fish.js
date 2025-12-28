const {
  Client,
  Permissions,
  version,
  PermissionFlagsBits,
} = require("discord.js");
const axios = require("axios");
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

    // Parse the major version reliably (handles versions like "14.24.2")
    const major = parseInt(String(version).split(".")[0], 10) || 0;

    // Resolve SEND_MESSAGES permission in a way that works for v13 and v14.
    // Fallback to numeric value 2048 if enumerations are not available.
    const SEND_MESSAGES_FLAG =
      (Permissions && Permissions.FLAGS && Permissions.FLAGS.SEND_MESSAGES) ||
      (PermissionFlagsBits && PermissionFlagsBits.SendMessages) ||
      2048;

    if (major < 13) {
      ev = "message";
      permissionsBitfield = SEND_MESSAGES_FLAG;
    } else {
      ev = "messageCreate";
      // For newer versions, pass the raw bitfield/flag value. This will work
      // with v13 (number) and v14 (PermissionFlagsBits or numeric) alike.
      permissionsBitfield = SEND_MESSAGES_FLAG;
    }

    client.on(ev, (message) => {
      if (message && message.partial) message.fetch().catch(() => {});
      this.checkForFish(client, message, permissionsBitfield).catch(() => {
        // Silently catch any unhandled errors from checkForFish
      });
    });

    client.on("messageUpdate", (oldMsg, newMsg) => {
      if (newMsg && newMsg.partial) newMsg.fetch().catch(() => {});
      this.checkForFish(client, newMsg, permissionsBitfield).catch(() => {
        // Silently catch any unhandled errors from checkForFish
      });
    });
  }

  /**
   * @description Checks if an existing link is a phishing link
   * @param {Client} client
   * @param {Message} message
   * @param {BigInt} permissionsBitfield
   */
  async checkForFish(client, message, permissionsBitfield) {
    if (message.author === client.user) return;

    const uAgent = `${client.user.username} (${client.generateInvite({
      scopes: ["bot", "applications.commands"],
      permissions: permissionsBitfield,
    })})`;
    const urlCheck =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i;

    if (!urlCheck.test(message.content)) return;
    const URL = message.content;

    try {
      const response = await axios({
        url: "https://anti-fish.bitflow.dev/check",
        method: "POST",
        headers: {
          "User-Agent": uAgent,
        },
        data: {
          message: URL,
        },
        // Accept 200 and 404 as valid - prevents axios from throwing on 404
        validateStatus: (status) => {
          return status === 200 || status === 404;
        },
      });

      // Check if we got a match (will be present in both 200 and 404 responses)
      const data = response.data;
      if (data && data.match === true) {
        client.emit("phishingMessage", message, data);
      }
      // If match is false or undefined, it's a safe link - do nothing
    } catch (error) {
      // This should only catch network errors, timeouts, or non-200/404 status codes
      // If we still get a 404 here, something went wrong with validateStatus
      if (error.response?.status === 404) {
        // Failsafe: silently ignore 404s even if validateStatus didn't work
        return;
      }

      // Log actual errors (network failures, 500s, API down, etc.)
      console.error("[anti-phish] API error:", error.message);
    }
  }
}

module.exports = Fish;
