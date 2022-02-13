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
    .setName(myCommands.ADD_ME_AS_COMMAND)
    .setDescription(
      "Adds person to the available players list with given name."
    )
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("New name:")
        .setRequired(true);
    }),
  new SlashCommandBuilder()
    .setName(myCommands.ADD_ME_COMMAND)
    .setDescription(
      "Adds person to the available players list using your display name."
    ),
  new SlashCommandBuilder()
    .setName(myCommands.REMOVE_ME_COMMAND)
    .setDescription("Removes person from available players list."),
  new SlashCommandBuilder()
    .setName(myCommands.CHANGE_ABBR_COMMAND)
    .setDescription(
      "Changes abbreviation of the player. Normally first letter of the name in the system."
    )
    .addStringOption((option) => {
      return option
        .setName("abbreviation")
        .setDescription("Abbreviation you wish to use")
        .setRequired(true);
    }),
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
    .setDescription("Say you want to join x number of games.")
    .addIntegerOption((option) => {
      return option
        .setName("num-games")
        .setDescription("How many games you wish to join")
        .setRequired(false);
    }),
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
