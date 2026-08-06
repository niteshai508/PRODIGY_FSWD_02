const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// REGISTER
// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password, role, adminKey } = req.body;
  try {
    // Role check
    let assignedRole = 'user';
    if (role === 'admin') {
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ error: 'Invalid Admin Secret Key!' });
      }
      assignedRole = 'admin';
    }

    const hashed = await bcrypt.hash(password, 12);
    await User.create({ username, email, password: hashed, role: assignedRole });
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists!' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found!' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password!' });

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.json({ message: 'Login successful!', username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully!' });
});

// GET Current User
router.get('/me', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Not logged in!' });
  res.json(req.session.user);
});

module.exports = router;