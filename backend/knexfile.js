require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'pingpong',
      user: 'admin',
      password: 'qwer1234',
      host: 'pp-db',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
