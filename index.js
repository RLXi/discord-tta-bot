require("dotenv").config();

const commands = require("./constants");
const { Client, Intents } = require("discord.js");
const { combinations } = require("./utils");

const client = new Client({
  // partials: ["MESSAGE"],
  intents: [Intents.FLAGS.GUILDS],
});

const BOT_PREFIX = "!tta";

client.on("ready", () => {
  console.log(`Bot is ready. Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === commands.ADD_ME_COMMAND) {
  } else if (commandName === commands.REMOVE_ME_COMMAND) {
  } else if (commandName === commands.STATS_COMMAND) {
  } else if (commandName === commands.JOIN_COMMAND) {
  } else if (commandName === commands.TOGGLE_PAUSE_COMMAND) {
  } else if (commandName === commands.GAME_STARTED_COMMAND) {
  }
});

client.login(process.env.TOKEN);
