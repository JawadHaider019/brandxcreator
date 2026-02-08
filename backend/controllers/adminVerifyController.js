const db = require('../config/db');

// Get all users with pending verification status
const getPendingUsers = async (req, res) => {
  try {
    const [pendingUsers] = await db.query(
      'SELECT * FROM Users WHERE verification_status = "pending"'
    );

    if (pendingUsers.length === 0) {
      return res.status(404).json({ message: 'No pending users found' });
    }

    return res.status(200).json({ pendingUsers });
  } catch (error) {
    console.error('Error fetching pending users:', error.message, error.stack);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Approve or reject user in a single route
const verifyUserStatus = async (req, res) => {
  const userId = req.params.user_id;
  const { status, reason } = req.body;

  // Validate status
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const [userRows] = await db.query('SELECT * FROM Users WHERE user_id = ?', [userId]);
    const user = userRows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verification_status === status) {
      return res.status(400).json({ message: `User already ${status}` });
    }

    if (user.verification_status !== 'pending') {
      return res.status(400).json({ message: `User is already ${user.verification_status}, cannot update to ${status}` });
    }

    if (status === 'rejected') {
      await db.query(
        'UPDATE Users SET verification_status = ?, verification_notes = ? WHERE user_id = ?',
        [status, reason || 'No reason provided', userId]
      );
    } else {
      await db.query(
        'UPDATE Users SET verification_status = ?, verification_notes = NULL WHERE user_id = ?',
        [status, userId]
      );
    }

    return res.status(200).json({ message: `User ${status} successfully` });
  } catch (error) {
    console.error('Error verifying user:', error.message, error.stack);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPendingUsers,
  verifyUserStatus,
};
