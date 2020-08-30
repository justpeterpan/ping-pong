const express = require('express');
const { raw } = require('objection');
const Match = require('./matches.model');

const router = express.Router();

router.get('/', async (req, res) => {
  /**
   * SELECT match.id, p1.username AS "player 1", p2.username AS "player 2"
   * FROM "match"
   * JOIN player AS p1 ON  match.player1=p1.id JOIN player AS p2 ON match.player2=p2.id
   */
  const match = await Match.query()
    .select(
      'player1',
      'player2',
      'match.id as id',
      'date_played',
      'win',
      'defeat',
      raw(`?? || ':' || ??`, 'player1_score', 'player2_score').as('score'),
      raw(`?? || ':' || ??`, 'player1_total_points', 'player2_total_points').as('total_points'),
      'set_score'
    )
    .where('deleted_at', null);
  res.json(match);
});

router.get('/:id', async (req, res, next) => {
  const match = await Match.query()
    .findById(req.params.id)
    .select(
      'player1',
      'player2',
      'match.id as id',
      'date_played',
      'win',
      'defeat',
      raw(`?? || ':' || ??`, 'player1_score', 'player2_score').as('score'),
      raw(`?? || ':' || ??`, 'player1_total_points', 'player2_total_points').as('total_points'),
      'set_score'
    )
    .where('deleted_at', null);
  if (match) {
    return res.json(match);
  }
  return next();
});

router.post('/', async (req, res, next) => {
  try {
    const match = await Match.query().insert(req.body);
    res.json(match);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
