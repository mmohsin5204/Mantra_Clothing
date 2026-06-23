const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email is required' });
  }

  try {
    // Create table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(150) NOT NULL UNIQUE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email.toLowerCase().trim()]
    );

    return res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'This email is already subscribed.' });
    }
    console.error('Newsletter error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
