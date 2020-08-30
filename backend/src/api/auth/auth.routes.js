const express = require('express');
const bcrypt = require('bcrypt');

const jwt = require('../../lib/jwt');

const Player = require('../players/players.model');

const router = express.Router();

const errorMessage = {
  invalidLogin: 'Invalid login.',
};

router.post('/signin', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const player = await Player.query().where({ username }).first();
    if (!player) {
      const error = new Error(errorMessage.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, player.password);
    if (!validPassword) {
      const error = new Error(errorMessage.invalidLogin);
      res.status(403);
      throw error;
    }
    const payload = {
      id: player.id,
      username: player.username,
    };
    const token = await jwt.sign(payload);

    res.json({
      player: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
