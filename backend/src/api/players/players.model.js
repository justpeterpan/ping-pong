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

  static get relationMappings() {
    return {
      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: ['player.id', 'player.id', 'player.id', 'player.id'],
          to: ['match.player1', 'match.player2', 'match.win', 'match.defeat'],
        },
      },
    };
  }
}

module.exports = Player;
