const { raw } = require('objection');
const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = ['id', 'first_name', 'last_name', 'gender', 'username'];
module.exports = {
  find() {
    return db(tableNames.player).select(fields);
  },
  async get(username) {
    return db(tableNames.player).select(fields).where({ username }).first();
  },

  async getStats(username) {
    const [match] = await db(tableNames.match).count().where({ player1: username }).orWhere({ player2: username });
    const [win] = await db(tableNames.match).count().where({ win: username });
    const [defeat] = await db(tableNames.match).count().whereNot({ win: username });
    return {
      matches: Number(match.count),
      wins: Number(win.count),
      defeats: Number(defeat.count),
      points: `${win.count * 2}:${defeat.count * 2}`,
    };
  },
};
