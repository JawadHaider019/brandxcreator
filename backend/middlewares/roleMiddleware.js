const db = require('../config/db');

exports.allowRole = (requiredRole) => {
  return async (req, res, next) => {
    const userId = req.user.user_id;

    try {
      const [rows] = await db.query('SELECT role, verification_status FROM Users WHERE user_id = ?', [userId]);
      const user = rows[0];

      if (!user) return res.status(404).json({ error: 'User not found' });

      if (user.verification_status !== 'approved') {
        return res.status(403).json({ error: `Your account is ${user.verification_status}` });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ error: `Only ${requiredRole}s can access this route` });
      }

      next();
    } catch (err) {
      console.error('Role check error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
};
