const express = require('express');
const { ref, raw } = require('objection');

const Player = require('./players.model');

const queries = require('./players.queries');
const Match = require('../matches/matches.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const players = await Player.query().select();
  res.json(players);
});

router.get('/table', async (req, res) => {
  const table = await Player.query()
    .select([
      'username',
      Match.query().where('win', ref('player.username')).count('win').as('win'),
      Match.query().where('defeat', ref('player.username')).count().as('defeat'),
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

router.get('/:id/matches', async (req, res) => {
  const matches = await Match.query()
    .select(
      'id',
      'player1',
      'player2',
      raw(`?? || ':' || ??`, 'player1_score', 'player2_score').as('score'),
      raw(`?? || ':' || ??`, 'player1_total_points', 'player2_total_points').as('total_points')
    )
    .where({ player1: req.params.id })
    .orWhere({ player2: req.params.id });

  res.json(matches);
});

router.get('/:id/stats', async (req, res, next) => {
  const player = await queries.getStats(req.params.id);
  if (player) {
    return res.json(player);
  }
  return next();
});

module.exports = router;
