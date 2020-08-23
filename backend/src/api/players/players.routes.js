const express = require('express');
const Player = require('./players.model');

const queries = require('./players.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const players = await Player.query().select('id', 'first_name', 'last_name', 'username').where('deleted_at', null);
  res.json(players);
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

router.get('/:id/defeats', async (req, res, next) => {
  const player = await queries.getDefeats(req.params.id);
  if (player) {
    return res.json(player);
  }
  return next();
});

module.exports = router;
