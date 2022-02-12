require('dotenv').config();

const {Client, Intents} = require('discord.js');
const { combinations } = require('./utils');

const client = new Client({
    // partials: ["MESSAGE"],
    intents: [Intents.FLAGS.GUILDS]
});

const BOT_PREFIX = '!tta';

const ADD_ME_COMMAND = 'add-me';        // add player to the list
const REMOVE_ME_COMMAND = 'remove-me'   // remove player from the list
const STATS_COMMAND = 'stats';          // show stats
const JOIN_COMMAND = 'join';            // express wish to join games. Follow with number to say up to how many games 
const PAUSE_COMMAND = 'pause';          // opt-out from games for now. Type again to unpause
const GAME_STARTED_COMMAND = 'game';    // display player combinations

client.on("ready", () => {
    console.log(`Bot is ready. Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    msg.react('🌐');
    msg.reply('höh');
    if (msg.content === `${BOT_PREFIX} ${ADD_ME_COMMAND}`) {}
    if (msg.content === `${BOT_PREFIX} ${REMOVE_ME_COMMAND}`) {}
    if (msg.content === `${BOT_PREFIX} ${STATS_COMMAND}`) {
        msg.channel.send('Here be stats: ...');
        msg.react('🤖');
    }
    if (msg.content === `${BOT_PREFIX} ${JOIN_COMMAND}`) {}
    if (msg.content === `${BOT_PREFIX} ${PAUSE_COMMAND}`) {}
    if (msg.content === `${BOT_PREFIX} ${GAME_STARTED_COMMAND}`) {}
});


client.login(process.env.BOT_TOKEN);