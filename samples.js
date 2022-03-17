/**
 * @property {string} id
 * @property {string} name
 * @property {string} customAbbreviation
 * @property {boolean} isPaused
 */
const playerSample = {
  id: "999999999999999999",
  name: "Discord displayName",
  customAbbreviation: "D",
  isPaused: false,
};

/**
 * @property {string} playerId
 * @property {number} score
 */
const positionSample = {
  playerId: "1",
  score: 300,
};

/**
 * @property {positionSample} firstPlace
 * @property {positionSample} secondPlace
 * @property {positionSample} thirdPlace
 * @property {positionSample} fourthPlace
 */
const endResultSample = {
  firstPlace: positionSample,
  secondPlace: {
    playerId: "2",
    score: 299,
  },
  thirdPlace: {
    playerId: "3",
    score: 298,
  },
  fourthPlace: {
    playerId: "4",
    score: 297,
  },
};

/**
 * @property {number} id auto incrementing number
 * @property {string} gameName Game name
 * @property {string} gameCode Game code
 * @property {string} gameStarted Game starting time
 * @property {string} gameFinished Game finishing time
 * @property {string[]} players Player's by their discord ID
 * @property {endResult} endResult Object holding position data
 */
const gameSample = {
  id: 1,
  gameName: "",
  gameCode: "",
  gameStarted: "",
  gameFinished: "",
  players: [1, 2, 3, 4],
  endResult: endResultSample,
};
