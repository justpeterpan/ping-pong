const express = require('express');
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
      'p1.id as player1_id',
      'p2.id as player2_id',
      'match.id as id',
      'match.score',
      'p1.username as player_1',
      'p2.username as player_2'
    )
    .join('player as p1', 'match.player1', 'p1.id')
    .join('player as p2', 'match.player2', 'p2.id');

  res.json(match);
});

router.get('/:id', async (req, res, next) => {
  const match = await Match.query().findById(req.params.id);
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
