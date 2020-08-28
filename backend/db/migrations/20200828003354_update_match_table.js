const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

/**
 *
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable(tableNames.match, (table) => {
    table.integer('defeat', 255).notNullable().references('id').inTable('player').onDelete('cascade');
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all([tableNames.match, tableNames.player].map((tableName) => knex.schema.dropTable(tableName)));
};
