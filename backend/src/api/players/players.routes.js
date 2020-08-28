const express = require('express');
const { ref } = require('objection');

const Player = require('./players.model');

const queries = require('./players.queries');
const Match = require('../matches/matches.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const players = await Player.query().select('id', 'first_name', 'last_name', 'username').where('deleted_at', null);
  res.json(players);
});

router.get('/table', async (req, res) => {
  const table = await Player.query()
    .select([
      'username',
      'id',
      Match.query().where('win', ref('player.id')).count('win').as('win'),
      Match.query().where('defeat', ref('player.id')).count().as('defeat'),
    ])
    .orderBy('win', 'desc', 'defeat');

  res.json(table);
});

router.get('/:id', async (req, res, next) => {
  const player = await queries.get(req.params.id);
  if (player) {
    return res.json(player);
  }
  return next();
});

router.get('/:id/matches', async (req, res, next) => {
  const player = await queries.getMatches(req.params.id);
  if (player) {
    return res.json(player);
  }
  return next();
});

router.get('/:id/stats', async (req, res, next) => {
  const player = await queries.getStats(req.params.id);
  if (player) {
    return res.json(player);
  }
  return next();
});

module.exports = router;
