const faunadb = require("faunadb");
const { Client, Intents } = require("discord.js");
const { combinations } = require("./utils");
const moment = require("moment");

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB,
  domain: process.env.FAUNA_DOMAIN,
});

const {
  Paginate,
  Get,
  Select,
  Match,
  Index,
  Create,
  Ref,
  Collection,
  Lambda,
  Var,
  Join,
  Call,
  Function: Fn,
  Update,
} = faunadb.query;

async function getPlayer(member) {
  try {
    const doc = await faunaClient.query(
      Get(Match(Index("players_by_id"), `${member.id}`))
    );
    return doc;
  } catch (e) {
    return `Something went wrong: ${e}`;
  }
}

async function addCommand(member) {
  try {
    const a = await getPlayer(member);
    if (typeof a === "string")
      return `There was an error while trying to add the player`;
    if (a?.data)
      return `Couldn't add player. ${member.displayName} is already in the database`;

    const data = {
      id: `${member.id}`,
      name: member.displayName,
      customAbbreviation: member.displayName[0].toUpperCase(),
      isPaused: false,
    };
    await faunaClient.query(Create(Collection("players"), { data }));
    return `${member.displayName} added`;
  } catch (e) {
    console.log(e);
    return `Something went wrong: ${e}`;
  }
}

async function addAsCommand(member, options) {
  try {
    const a = getPlayer(member);
    if (a) return `${member.displayName} is already in the database`;
    const data = {
      id: `${member.id}`,
      name: options.getString("name"),
      customAbbreviation: member.displayName[0].toUpperCase(),
      isPaused: false,
    };
    await faunaClient.query(Create(Collection("players"), { data }));
    return `${member.displayName} added`;
  } catch (e) {
    console.log(e);
    return `Something went wrong: ${e}`;
  }
}

async function removeCommand(member) {
  try {
    return `Removed name: ${member.displayName}`;
  } catch (e) {
    console.log(e);
    return `Something went wrong: ${e}`;
  }
}

async function statsCommand() {
  return "Stats: testing";
}

async function joinCommand(member, options) {
  try {
    const numGames = options.getInteger("num-games", false);
    console.log(member, options);
    return `${member.displayName} joining ${numGames} games`;
  } catch (e) {
    console.log(e);
    return `Something went wrong: ${e}`;
  }
}

async function togglePauseCommand(member) {
  try {
    const doc = await faunaClient.query(
      Get(Match(Index("players_by_id"), `${member.id}`))
    );
    return `${JSON.stringify(doc)}`;
  } catch (e) {
    console.log(e);
    return `Something went wrong: ${e}`;
  }
}

async function changeAbbrCommand(member, options) {
  try {
    // const doc = await faunaClient.query(
    //   Get(Match(Index("players_by_id"), `${interaction.member.id}`))
    // );
    // const data = Object.assign({}, doc.data);
    const newAbbr = options.getString("abbreviation")[0].toUpperCase();
    console.log(newAbbr);
    // data.customAbbreviation = newAbbr;

    // const names = res.data.results.map((i) => i.name);
    // await interaction.reply(`${names.join("\n")}`);
    //await faunaClient.query(Create(Collection("players"), { data }));
    /*
      const doc = await client.query(
          Let(
            {
              playerRef: Ref(Collection('players'), `${interaction.member.id}`),
              playerExists: Exists(Var('playerRef')),
              player: If(
                Var('playerExists'),
                Get(Var('playerRef')),
                null
              )
            },
            If(
              Var('playerExists'),
              Update(
                Ref(Collection('players'), `${interaction.member.id}`),
                { data: { customAbbreviation: newAbbr } }
              ),
              null
            )
          )
        )
        */

    const A = await faunaClient.query(
      Update(Get(Match(Index("players_by_id"), `${member.id}`)), {
        data: { customAbbreviation: newAbbr },
      })
    );
    console.log(JSON.stringify(A));

    return `Changed abbreviation to '${newAbbr}'`;
  } catch (e) {
    console.log(e);

    return `Something went wrong: ${e}`;
  }
}

async function gameStartCommand() {
  try {
    return `Games starting`;
  } catch (e) {
    console.log(e);

    return `Something went wrong: ${e}`;
  }
}

async function finishGameCommand(member, options) {
  try {
    const a = moment().format("YYYY-MM-DD");
    const created = moment().format("YYYY-MM-DD HH:mm:ss");
    return `Game finished ${a}`;
  } catch (e) {
    console.log(e);

    return `Something went wrong: ${e}`;
  }
}

module.exports = {
  addCommand,
  addAsCommand,
  removeCommand,
  statsCommand,
  gameStartCommand,
  joinCommand,
  changeAbbrCommand,
  togglePauseCommand,
  finishGameCommand,
};
