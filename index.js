require("dotenv").config();

const commands = require("./constants");
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
    case commands.ADD_ME_COMMAND:
      addCommand(interaction, member);
      break;
    case commands.ADD_ME_AS_COMMAND:
      addAsCommand(interaction, member, options);
      break;
    case commands.REMOVE_ME_COMMAND:
      removeCommand(interaction, member);
      break;
    case commands.STATS_COMMAND:
      statsCommand(interaction);
      break;
    case commands.JOIN_COMMAND:
      joinCommand(interaction, member, options);
      break;
    case commands.TOGGLE_PAUSE_COMMAND:
      togglePauseCommand(interaction, member);
      break;
    case commands.CHANGE_ABBR_COMMAND:
      changeAbbrCommand(interaction, member, options);
      break;
    case commands.GAME_STARTED_COMMAND:
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
