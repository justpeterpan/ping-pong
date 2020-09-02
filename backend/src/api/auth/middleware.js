const ensureLoggedIn = (req, res, next) => {
  if (req.signedCookies.name) {
    next();
  } else {
    res.status(401);
    next(new Error('No!'));
  }
};

module.exports = {
  ensureLoggedIn,
};
