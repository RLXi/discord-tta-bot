/**
 * @property {string} ADD_ME_COMMAND -- add player to the list
 * @property {string} ADD_ME_AS_COMMAND -- add player to the list as given input
 * @property {string} REMOVE_ME_COMMAND -- remove player from the list
 * @property {string} CHANGE_ABBR_COMMAND -- change player abbreviation
 * @property {string} STATS_COMMAND -- show stats
 * @property {string} JOIN_COMMAND -- express wish to join games. Follow with number to say up to how many games
 * @property {string} TOGGLE_PAUSE_COMMAND -- opt-out from games for now. Type again to unpause
 * @property {string} GAME_STARTED_COMMAND -- display player combinations
 */

const constants = {
  ADD_ME_COMMAND: "add-me",
  ADD_ME_AS_COMMAND: "add-me-as",
  REMOVE_ME_COMMAND: "remove-me",
  CHANGE_ABBR_COMMAND: "abbr",
  STATS_COMMAND: "stats",
  JOIN_COMMAND: "join",
  TOGGLE_PAUSE_COMMAND: "pause",
  GAME_STARTED_COMMAND: "game",
};

module.exports = constants;
