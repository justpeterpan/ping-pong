const express = require('express');

const players = require('./players/players.routes');
const matches = require('./matches/matches.routes');
const auth = require('./auth/auth.routes');
const project = require('../constants/project');
// const auth = require('./auth/auth.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});
router.use('/players', players);
router.use('/matches', matches);
router.use('/auth', auth);

module.exports = router;
