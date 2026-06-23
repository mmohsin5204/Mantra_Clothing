const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.createContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  await db.query(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message]
  );
  res.status(201).json({ success: true, message: 'Message sent successfully' });
});