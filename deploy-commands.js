require("dotenv").config();

const myCommands = require("./constants");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  new SlashCommandBuilder()
    .setName(myCommands.ADD_ME_COMMAND)
    .setDescription("Adds person to the available players list."),
  new SlashCommandBuilder()
    .setName(myCommands.REMOVE_COMMAND)
    .setDescription("Removes person from available players list."),
  new SlashCommandBuilder()
    .setName(myCommands.STATS_COMMAND)
    .setDescription("Print out various stats."),
  new SlashCommandBuilder()
    .setName(myCommands.TOGGLE_PAUSE_COMMAND)
    .setDescription("Opt-out of games. Typed this command again to opt-in."),
  new SlashCommandBuilder()
    .setName(myCommands.GAME_STARTED_COMMAND)
    .setDescription("Print out combinations of available games."),
  new SlashCommandBuilder()
    .setName(myCommands.JOIN_COMMAND)
    .setDescription("Say you want to join x number of games."),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
