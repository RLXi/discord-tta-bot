/**
 * @property {string} ADD_ME_COMMAND -- add player to the list
 * @property {string} REMOVE_ME_COMMAND -- remove player from the list
 * @property {string} STATS_COMMAND -- show stats
 * @property {string} JOIN_COMMAND -- express wish to join games. Follow with number to say up to how many games
 * @property {string} TOGGLE_PAUSE_COMMAND -- opt-out from games for now. Type again to unpause
 * @property {string} GAME_STARTED_COMMAND -- display player combinations
 */

const constants = {
  ADD_ME_COMMAND: "add-me",
  REMOVE_ME_COMMAND: "remove-me",
  STATS_COMMAND: "stats",
  JOIN_COMMAND: "join",
  TOGGLE_PAUSE_COMMAND: "pause",
  GAME_STARTED_COMMAND: "game",
};

module.exports = constants;
