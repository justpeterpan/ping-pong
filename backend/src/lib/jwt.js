const jwt = require('jsonwebtoken');

const sign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
};

module.exports = {
  sign,
};
