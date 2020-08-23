const express = require('express');

const queries = require('./players.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const players = await queries.find();
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

router.get('/:id/wins', async (req, res, next) => {
  const player = await queries.getWins(req.params.id);
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
