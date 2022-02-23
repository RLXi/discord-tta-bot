require("dotenv").config();

const {
  ADD_ME_COMMAND,
  ADD_ME_AS_COMMAND,
  REMOVE_ME_COMMAND,
  STATS_COMMAND,
  JOIN_COMMAND,
  TOGGLE_PAUSE_COMMAND,
  CHANGE_ABBR_COMMAND,
  GAME_STARTED_COMMAND,
  DB_STATS_COMMAND,
} = require("./constants");

const {
  addCommand,
  addAsCommand,
  removeCommand,
  statsCommand,
  gameStartCommand,
  joinCommand,
  changeAbbrCommand,
  togglePauseCommand,
} = require("./functions");

const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.on("ready", () => {
  console.log(`Bot is ready. Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, member, options } = interaction;

  switch (commandName) {
    case ADD_ME_COMMAND: {
      const msg = await addCommand(member);
      interaction.reply(msg);
      break;
    }
    case ADD_ME_AS_COMMAND: {
      const msg = await addAsCommand(member, options);
      interaction.reply(msg);
      break;
    }
    case REMOVE_ME_COMMAND: {
      const msg = await removeCommand(member);
      interaction.reply(msg);
      break;
    }
    case STATS_COMMAND: {
      const msg = await statsCommand();
      interaction.reply(msg);
      break;
    }
    case JOIN_COMMAND: {
      const msg = await joinCommand(member, options);
      interaction.reply(msg);
      break;
    }
    case TOGGLE_PAUSE_COMMAND: {
      const msg = await togglePauseCommand(member);
      interaction.reply(msg);
      break;
    }
    case CHANGE_ABBR_COMMAND: {
      const msg = await changeAbbrCommand(member, options);
      interaction.reply(msg);
      break;
    }
    case GAME_STARTED_COMMAND: {
      const msg = await gameStartCommand();
      interaction.reply(msg);
      break;
    }
    case DB_STATS_COMMAND: {
      const msg = await dbStatsCommand();
      interaction.reply(msg);
      break;
    }
    default:
      await interaction.reply("Pong!");
      break;
  }
});

client.login(process.env.TOKEN);
