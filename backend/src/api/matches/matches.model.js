const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./matches.schema.json');
const Player = require('../players/players.model');

class Match extends Model {
  static get tableName() {
    return tableNames.match;
  }

  static get jsonSchema() {
    return schema;
  }

  static get jsonAttributes() {
    return [];
  }

  static get relationMappings() {
    return {
      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: ['match.player1', 'match.player2', 'match.win'],
          to: ['player.id', 'player.id', 'player.id'],
        },
      },
    };
  }
}

module.exports = Match;
