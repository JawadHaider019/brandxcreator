const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const VALID_METHODS = ['bank_transfer', 'easypaisa', 'jazzcash', 'other'];

exports.getPaymentMethods = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const [rows] = await db.query(
      'SELECT method_id, method_type, account_details, is_primary, created_at FROM Payment_Methods WHERE user_id = ?',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Get Payment Methods Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addPaymentMethod = async (req, res) => {
  const userId = req.user.user_id;
  const { method_type, account_details, is_primary } = req.body;

  if (!VALID_METHODS.includes(method_type)) {
    return res.status(400).json({ error: 'Invalid payment method type' });
  }
  if (!account_details) {
    return res.status(400).json({ error: 'Account details are required' });
  }

  try {
    const methodId = uuidv4();

    // If is_primary is true, set others to false first
    if (is_primary) {
      await db.query(
        'UPDATE Payment_Methods SET is_primary = FALSE WHERE user_id = ?',
        [userId]
      );
    }

    await db.query(
      `INSERT INTO Payment_Methods (method_id, user_id, method_type, account_details, is_primary, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [methodId, userId, method_type, JSON.stringify(account_details), !!is_primary]
    );

    res.status(201).json({ message: 'Payment method added', methodId });
  } catch (error) {
    console.error('Add Payment Method Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  const userId = req.user.user_id;
  const methodId = req.params.method_id;
  const { method_type, account_details, is_primary } = req.body;

  if (method_type && !VALID_METHODS.includes(method_type)) {
    return res.status(400).json({ error: 'Invalid payment method type' });
  }

  try {
    // Check ownership
    const [existing] = await db.query(
      'SELECT * FROM Payment_Methods WHERE method_id = ? AND user_id = ?',
      [methodId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    // If is_primary is true, reset others
    if (is_primary) {
      await db.query(
        'UPDATE Payment_Methods SET is_primary = FALSE WHERE user_id = ?',
        [userId]
      );
    }

    // Build update query dynamically
    const fields = [];
    const values = [];

    if (method_type) {
      fields.push('method_type = ?');
      values.push(method_type);
    }
    if (account_details) {
      fields.push('account_details = ?');
      values.push(JSON.stringify(account_details));
    }
    if (typeof is_primary === 'boolean') {
      fields.push('is_primary = ?');
      values.push(is_primary);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    values.push(methodId, userId);

    await db.query(
      `UPDATE Payment_Methods SET ${fields.join(', ')} WHERE method_id = ? AND user_id = ?`,
      values
    );

    res.json({ message: 'Payment method updated' });
  } catch (error) {
    console.error('Update Payment Method Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  const userId = req.user.user_id;
  const methodId = req.params.method_id;

  try {
    // Check ownership
    const [existing] = await db.query(
      'SELECT * FROM Payment_Methods WHERE method_id = ? AND user_id = ?',
      [methodId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    await db.query(
      'DELETE FROM Payment_Methods WHERE method_id = ? AND user_id = ?',
      [methodId, userId]
    );

    res.json({ message: 'Payment method deleted' });
  } catch (error) {
    console.error('Delete Payment Method Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
