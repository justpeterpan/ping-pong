const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./players.schema.json');

class Player extends Model {
  static get tableName() {
    return tableNames.player;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Player;
