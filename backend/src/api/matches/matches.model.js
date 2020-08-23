const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./matches.schema.json');

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
}

module.exports = Match;
