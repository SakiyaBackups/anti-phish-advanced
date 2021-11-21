<p align="center"><img src="https://i.imgur.com/psCk5zC.png"></p>

# Anti-Phish Advanced

This is the advanced version of the [Anti-Phishing Implementation](https://github.com/SakiyaDev/anti-phish-implementation) library. Made to cater to the advanced developer population who might want to handle phishers differently than the implementation library. 


## Installation

```
npm i anti-phish-advanced
```

## Usage

```js
const { Client, version } = require('discord.js');
const { Fish } = require('anti-phish-advanced'); //fancy imports
const client = new Client({ intents: ['GUILD_MESSAGES', 'GUILDS',] }); //create client, requires guild and guild messages to function.
const fish = new Fish(); //create fish

client.on("phishingMessage", (message, data) => {
    console.log(message, data); //"message" is the Message object containing the link, and "data" is the data returned by the api

    message.channel.send(`Phishing link detected by ${message.author}. Clicking this link may put your account at risk.`);
});

fish.init(client, version); //initialize fishing client, DO THIS BEFORE YOU LOGIN. Pass version if you would like, default is the latest djs version.
client.login('TOKEN'); //login to discord.
```

## Extra

This library was made to cater to more of the advanced developers. Keeping that in mind, there is a simpler version of this project, which can be found at [SakiyaDev/anti-phish-implementation](https://github.com/SakiyaDev/anti-phish-implementation) on Github, and [anti-phish-implementation](https://www.npmjs.com/package/anti-phish-implementation) on NPM.

## Contributing

Contributes are welcomed, please create a pull request to make any changes. But for major changes, please open an issue first to let us know what you would like to change.

*Make sure to update tests appropriately, depending on changes. Thanks!*

## Bugs

Please report any bugs in [issues](https://github.com/SakiyaDev/anti-phish-advanced/issues) with the bug tag! Thank you!

## License

[APGL-3.0](https://choosealicense.com/licenses/agpl-3.0/)