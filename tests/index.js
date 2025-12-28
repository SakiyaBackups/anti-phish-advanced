const { Client, version, GatewayIntentBits } = require("discord.js");
const { Fish } = require("../lib/index"); //fancy imports

// Create client using v14 GatewayIntentBits enumerations. This file is a
// dry-run-friendly example: it will not call login unless a TOKEN environment
// variable is provided.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const fish = new Fish(); //create fish

client.on("phishingMessage", (message, data) => {
  console.log("phishingMessage event:", { message: message?.content, data }); // message may be partial in dry runs

  // only attempt to send if channel exists and is sendable
  if (
    message &&
    message.channel &&
    typeof message.channel.send === "function"
  ) {
    message.channel
      .send(
        `Phishing link detected by ${message.author}. Clicking this link may put your account at risk.`
      )
      .catch(() => {});
  }
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection: " + err);
});

fish.init(client, version); //initialize fishing client, DO THIS BEFORE YOU LOGIN.

// Only login if a real token is provided via environment variable. This keeps
// tests safe to run locally/CI without secrets.
const token = process.env.TOKEN;
if (token) {
  client.login(token).catch((err) => console.error("Login failed:", err));
} else {
  console.log(
    "No TOKEN environment variable provided — skipping client.login (dry-run)."
  );
}
