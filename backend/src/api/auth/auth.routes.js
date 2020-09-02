const express = require('express');
const bcrypt = require('bcrypt');

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
    res.cookie('name', username, {
      httpOnly: true,
      sameSite: true,
      secure: false,
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 /* expire a week from today */,
    });
    res.json({
      player: payload,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/signout', async (req, res) => {
  res.clearCookie('name', { httpOnly: true, sameSite: true, secure: false, signed: true });
  res.json('Cookie cleared');
});

module.exports = router;
