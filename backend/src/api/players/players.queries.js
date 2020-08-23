const db = require('../../db');
const tableNames = require('../../constants/tableNames');
const { table } = require('../../db');

const fields = ['id', 'first_name', 'last_name', 'gender', 'username'];
module.exports = {
  find() {
    return db(tableNames.player).select(fields);
  },
  async get(id) {
    const [player] = await db(tableNames.player).select(fields).where({ id });
    return player;
  },

  async getMatches(id) {
    const [match] = await db(tableNames.match)
      .select('id', 'player1', 'player2', 'score', 'set_score')
      .where({ player1: id })
      .orWhere({ player2: id });
    return match;
  },

  async getWins(id) {
    const [win] = await db(tableNames.match).count('win as wins').where({ win: id });
    return win;
  },

  async getDefeats(id) {
    const [defeat] = await db(tableNames.match)
      .count()
      .whereNot({ player1: id, win: id })
      .orWhereNot({ player2: id, win: id });
    return defeat;
  },
};
