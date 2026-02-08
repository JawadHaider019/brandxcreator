const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch admin by email
    const [admin] = await db.query('SELECT * FROM Admins WHERE email = ?', [email]);

    if (admin.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const adminUser = admin[0];

    // Compare password
    // const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid password' });
    // }
    const bcrypt = require('bcrypt');
bcrypt.hash('admin123', 10).then(console.log);

    // Generate JWT
    const token = jwt.sign(
      { admin_id: adminUser.admin_id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Admin logged in successfully',
      token,
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

module.exports = {
  adminLogin,
};
