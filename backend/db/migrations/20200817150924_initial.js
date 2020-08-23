const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

const addDefaultColumns = (table) => {
  table.timestamps(false, true);
  table.datetime('deleted_at');
};

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.player, (table) => {
    table.increments().notNullable();
    table.string('first_name', 50).notNullable();
    table.string('last_name').notNullable();
    table.string('gender', 1).notNullable();
    table.string('username', 100).notNullable().unique();
    table.string('password', 127).notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.match, (table) => {
    table.increments().notNullable();
    table.integer('player1', 255).notNullable().references('id').inTable('player').onDelete('cascade');
    table.integer('player2', 255).notNullable().references('id').inTable('player').onDelete('cascade');
    table.dateTime('date_played').notNullable();
    table.integer('win', 255).notNullable().references('id').inTable('player').onDelete('cascade');
    table.text('score', 3).notNullable();
    table.text('total_points', 6).notNullable();
    table.specificType('set_score', 'text[]').notNullable();
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all([tableNames.match, tableNames.player].map((tableName) => knex.schema.dropTable(tableName)));
};
