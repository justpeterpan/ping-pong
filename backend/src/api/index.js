const express = require('express');

const authMiddleware = require('./auth/middleware');
const auth = require('./auth/auth.routes');
const players = require('./players/players.routes');
const matches = require('./matches/matches.routes');
const project = require('../constants/project');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});
router.use('/auth', auth);
router.use('/players', authMiddleware.ensureLoggedIn, players);
router.use(
  '/matches',
  // authMiddleware.ensureLoggedIn,
  matches
);

module.exports = router;
