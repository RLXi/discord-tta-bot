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
    case ADD_ME_COMMAND:
      addCommand(interaction, member);
      break;
    case ADD_ME_AS_COMMAND:
      addAsCommand(interaction, member, options);
      break;
    case REMOVE_ME_COMMAND:
      removeCommand(interaction, member);
      break;
    case STATS_COMMAND:
      statsCommand(interaction);
      break;
    case JOIN_COMMAND:
      joinCommand(interaction, member, options);
      break;
    case TOGGLE_PAUSE_COMMAND:
      togglePauseCommand(interaction, member);
      break;
    case CHANGE_ABBR_COMMAND:
      changeAbbrCommand(interaction, member, options);
      break;
    case GAME_STARTED_COMMAND:
      gameStartCommand(interaction);
      break;
    case "server":
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
      break;
    default:
      await interaction.reply("Pong!");
      break;
  }
});

client.login(process.env.TOKEN);
