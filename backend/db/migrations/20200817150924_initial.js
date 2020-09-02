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
  await knex.schema.createTableIfNotExists(tableNames.player, (table) => {
    table.increments().notNullable();
    table.string('first_name', 50).notNullable();
    table.string('last_name').notNullable();
    table.string('gender', 1).notNullable();
    table.string('username', 100).notNullable().unique();
    table.string('password', 127).notNullable();
    table.string('token', 255);
    addDefaultColumns(table);
  });

  await knex.schema.createTableIfNotExists(tableNames.match, (table) => {
    table.increments().notNullable();
    table.string('player1', 50).notNullable().references('username').inTable('player').onDelete('cascade');
    table.string('player2', 50).notNullable().references('username').inTable('player').onDelete('cascade');
    table.dateTime('date_played').notNullable();
    table.string('win', 50).notNullable().references('username').inTable('player').onDelete('cascade');
    table.string('defeat', 50).notNullable().references('username').inTable('player').onDelete('cascade');
    table.integer('player1_score', 1).notNullable();
    table.integer('player2_score', 1).notNullable();
    table.integer('player1_total_points', 3).notNullable();
    table.integer('player2_total_points', 3).notNullable();
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
