const express = require('express');

const players = require('./players/players.routes');
const project = require('../constants/project');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});
router.use('/players', players);

module.exports = router;
