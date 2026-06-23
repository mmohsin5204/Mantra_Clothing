const db = require('../config/db');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existingUsers.length > 0) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash, is_admin) VALUES (?, ?, ?, 0)',
    [name, email, hashedPassword]
  );

  const token = generateToken(result.insertId, email, false);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: result.insertId,
      name,
      email,
      is_admin: false
    }
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = generateToken(user.id, user.email, !!user.is_admin);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: !!user.is_admin
    }
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  const [users] = await db.query('SELECT id, name, email, is_admin FROM users WHERE id = ?', [req.user.id]);
  if (users.length === 0) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({
    success: true,
    user: {
      ...users[0],
      is_admin: !!users[0].is_admin
    }
  });
});
