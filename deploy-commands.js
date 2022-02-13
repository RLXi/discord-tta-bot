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
    .setName(ADD_ME_AS_COMMAND)
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
    .setName(ADD_ME_COMMAND)
    .setDescription(
      "Adds person to the available players list using your display name."
    ),
  new SlashCommandBuilder()
    .setName(REMOVE_ME_COMMAND)
    .setDescription("Removes person from available players list."),
  new SlashCommandBuilder()
    .setName(CHANGE_ABBR_COMMAND)
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
    .setName(STATS_COMMAND)
    .setDescription("Print out various stats."),
  new SlashCommandBuilder()
    .setName(TOGGLE_PAUSE_COMMAND)
    .setDescription("Opt-out of games. Typed this command again to opt-in."),
  new SlashCommandBuilder()
    .setName(GAME_STARTED_COMMAND)
    .setDescription("Print out combinations of available games."),
  new SlashCommandBuilder()
    .setName(JOIN_COMMAND)
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
