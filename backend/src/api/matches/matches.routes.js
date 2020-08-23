const express = require('express');
const Match = require('./matches.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const matches = await Match.query().select().where('deleted_at', null);
  res.json(matches);
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
