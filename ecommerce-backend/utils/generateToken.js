const jwt = require('jsonwebtoken');

const generateToken = (id, email, isAdmin) => {
  return jwt.sign(
    { id, email, is_admin: isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
