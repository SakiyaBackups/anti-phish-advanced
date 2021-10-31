<p align="center"><img src="https://i.imgur.com/psCk5zC.png"></p>

# Anti-Phish Implementation

This library is an anti-phising implementation that is easy to implement in your bot. This library was made to flatten the curve on the growing rate of phising attempts on discord.

## Installation

```
npm i anti-phish-implementation
```

## Usage


### Default

```js
const { Fish } = require("anti-phish-implementation"); //import fish client
const { Client } = require("discord.js"); //import disc client

const bot = new Client({ intents: ["GUILD_MESSAGES", "GUILDS"] }); //create disc client
const fish = new Fish(bot, { enabled: true }); //create fish client

fish.init(); //initialize the anti-phising feature
```

### Kick / Ban

```js
const { Fish } = require("anti-phish-implementation"); //import fish client
const { Client } = require("discord.js"); //import disc client

const bot = new Client({ intents: ["GUILD_MESSAGES", "GUILDS"] }); //create disc client
const fish = new Fish(bot, { enabled: true, kick: false, ban: false }); //create fish client

fish.init(); //initialize the anti-phising feature
```

### Custom Embed / Ban & Kick Reason

```js
const { Fish } = require("anti-phish-implementation"); //import fish client
const { Client, MessageEmbed } = require("discord.js"); //import disc client

const bot = new Client({ intents: ["GUILD_MESSAGES", "GUILDS"] }); //create disc client
const tstEm = new MessageEmbed().setColor("RED").setTitle("Test Embed").setDescription("{member} hey");
const fish = new Fish(bot, { enabled: true, kick: false, ban: false, reason: "Test Reason", embed: tstEm }); //create fish client

fish.init(); //initialize the anti-phising feature
```

## Info


### MessageEmbed Description Params


|  Parameter   |   Description   |
|--------------|----------------:|
|  `{member}`  | Phiser's Tag    |
|  `{mention}` | Mentions phiser |
|   `{kick}`   | Kick boolean    |
|    `{ban}`   | Ban boolean     |
|   `{link}`   | Phising link    |
|   `{type}`   | Link type       |


## Extra

This library of this project was made to be very easy to use. Keeping that in mind, there is an advanced of this project, which can be found at [SakiyaDev/anti-phish-advanced](https://github.com/SakiyaDev/anti-phish-advanced) on Github, and [anti-phish-advanced](https://www.npmjs.com/package/anti-phish-advanced) on NPM, once it is done! (WIP)

## Contributing

Contributes are welcomed, please create a pull request to make any changes. But for major changes, please open an issue first to let us know what you would like to change.

*Make sure to update tests appropriately, depending on changes. Thanks!*

## Bugs

Please report any bugs in [issues](https://github.com/SakiyaDev/anti-phish-implementation/issues) with the bug tag! Thank you!

## License

[APGL-3.0](https://choosealicense.com/licenses/agpl-3.0/)