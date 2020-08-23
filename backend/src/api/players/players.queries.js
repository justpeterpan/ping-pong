const db = require('../../db');
const tableNames = require('../../constants/tableNames');

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
    const match = await db(tableNames.match)
      .select('id', 'player1', 'player2', 'score', 'set_score')
      .where({ player1: id })
      .orWhere({ player2: id });
    return match;
  },

  async getStats(id) {
    const [match] = await db(tableNames.match).count().where({ player1: id }).orWhere({ player2: id });
    const [win] = await db(tableNames.match).count().where({ win: id });
    const [defeat] = await db(tableNames.match).count().whereNot({ win: id });
    return {
      matches: Number(match.count),
      wins: Number(win.count),
      defeats: Number(defeat.count),
      points: `${win.count * 2}:${defeat.count * 2}`,
    };
  },
};
