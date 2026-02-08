const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Check verification status BEFORE password
    if (user.verification_status === 'pending') {
      return res.status(403).json({ error: 'Your account is still pending approval by admin.' });
    }

    if (user.verification_status === 'rejected') {
      return res.status(403).json({ error: `Your account was rejected. Reason: ${user.verification_notes}` });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if wallet exists, if not create it
    const [wallets] = await db.query('SELECT * FROM Wallets WHERE user_id = ?', [user.user_id]);
    if (wallets.length === 0) {
      console.log('No wallet found, creating now for user_id:', user.user_id); // <<< Log statement
      const wallet_id = uuidv4(); // Generate a new UUID for wallet_id
      const [walletInsertResult] = await db.query('INSERT INTO Wallets (wallet_id, user_id, balance) VALUES (?, ?, ?)', [wallet_id, user.user_id, 0]);
      console.log('Wallet insert result:', walletInsertResult); // <<< Log statement
    }

    // Generate token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
