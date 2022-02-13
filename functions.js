const faunadb = require("faunadb");
const { Client, Intents } = require("discord.js");
const { combinations } = require("./utils");

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
    console.log(e);
  }
  return null;
}

async function addCommand(interaction, member) {
  try {
    const data = {
      id: `${member.id}`,
      name: member.displayName,
      customAbbreviation: member.displayName[0].toUpperCase(),
      isPaused: false,
    };
    await faunaClient.query(Create(Collection("players"), { data }));
    await interaction.reply(`${member.displayName} added`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
  }
  //await interaction.reply(`Added name: ${interaction.member.displayName}`);
}

async function addAsCommand(interaction, member, options) {
  try {
    const data = {
      id: `${member.id}`,
      name: options.getString("name"),
      customAbbreviation: member.displayName[0].toUpperCase(),
      isPaused: false,
    };
    await faunaClient.query(Create(Collection("players"), { data }));
    await interaction.reply(`${member.displayName} added`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
  }
  //await interaction.reply(`Added name: ${interaction.member.displayName}`);
}

async function removeCommand(interaction, member) {
  try {
    await interaction.reply(`Removed name: ${member.displayName}`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
  }
}

async function statsCommand(interaction) {
  await interaction.reply(`Stats: testing`);
}

async function joinCommand(interaction, member, options) {
  try {
    const numGames = options.getInteger("input", false);
    await interaction.reply(`${member.displayName} joining ${numGames} games`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
  }
}

async function togglePauseCommand(interaction, member) {
  try {
    const doc = await faunaClient.query(
      Get(Match(Index("players_by_id"), `${member.id}`))
    );
    await interaction.reply(`${JSON.stringify(doc)}`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
  }
}

async function changeAbbrCommand(interaction, member, options) {
  try {
    // const doc = await faunaClient.query(
    //   Get(Match(Index("players_by_id"), `${interaction.member.id}`))
    // );
    // const data = Object.assign({}, doc.data);
    const newAbbr = options.getString("abbreviation")[0].toUpperCase();
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
    await interaction.reply(`Changed abbreviation to '${newAbbr}'`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
  }
}

async function gameStartCommand(interaction) {
  try {
    await interaction.reply(`Games starting`);
  } catch (e) {
    console.log(e);
    await interaction.reply(`Something went wrong: ${e}`);
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
};
