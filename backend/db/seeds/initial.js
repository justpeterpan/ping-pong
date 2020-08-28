const Knex = require('knex');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const tableNames = require('../../src/constants/tableNames');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await [tableNames.match, tableNames.player].reduce(async (promise, tableName) => {
    await promise;
    return knex(tableName).del();
  }, Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');

  const player1 = {
    first_name: 'player',
    last_name: 'one',
    gender: 'm',
    username: 'playerone',
    password: await bcrypt.hash(password, 12),
  };

  const player2 = {
    first_name: 'player',
    last_name: 'two',
    gender: 'm',
    username: 'playertwo',
    password: await bcrypt.hash(password, 12),
  };

  const match1 = {
    player1: 1,
    player2: 2,
    date_played: new Date().toISOString(),
    win: 1,
    defeat: 2,
    score: '3:1',
    total_points: '34:14',
    set_score: ['11:1', '11:1', '1:11', '11:1'],
  };

  const match2 = {
    player1: 1,
    player2: 2,
    date_played: new Date().toISOString(),
    win: 2,
    defeat: 1,
    score: '2:3',
    total_points: '27:43',
    set_score: ['1:11', '4:11', '11:9', '11:1', '0:11'],
  };

  const [createdPlayers] = await knex(tableNames.player).insert([player1, player2]).returning('*');

  const [createdMatch] = await knex(tableNames.match).insert([match1, match2]).returning('*');

  console.log(
    'Players created:',
    {
      password,
    },
    createdPlayers,
    'Match created:',
    createdMatch
  );
};
