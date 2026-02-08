const db = require('../config/db');
const uuid = require('uuid');

// 📌 1. User requests a refund
exports.requestRefund = async (req, res) => {
  const { transaction_id, amount, reason } = req.body || {};
  const user_id = req.user.user_id;

  if (!transaction_id || !amount || !reason) {
    return res.status(400).json({ error: 'Please provide transaction_id, amount, and reason' });
  }

  try {
    const [transactions] = await db.query(
      `SELECT wt.*, w.wallet_id 
       FROM Wallet_Transactions wt
       JOIN Wallets w ON wt.wallet_id = w.wallet_id
       WHERE wt.transaction_id = ? AND w.user_id = ?`,
      [transaction_id, user_id]
    );

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'Transaction not found or not owned by user' });
    }

    const transaction = transactions[0];

    if (amount > transaction.amount) {
      return res.status(400).json({ error: 'Refund amount cannot exceed transaction amount' });
    }

    const refund_id = uuid.v4();

    await db.query(
      'INSERT INTO Refunds (refund_id, transaction_id, user_id, amount, reason) VALUES (?, ?, ?, ?, ?)',
      [refund_id, transaction_id, user_id, amount, reason]
    );

    return res.status(201).json({ message: 'Refund request submitted', refund_id });
  } catch (err) {
    console.error('Error requesting refund:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// 📌 2. Admin gets all refund requests
exports.getAllRefunds = async (req, res) => {
  try {
    const [refunds] = await db.query(
      `SELECT r.*, u.full_name, t.amount AS transaction_amount
       FROM Refunds r
       JOIN Users u ON r.user_id = u.user_id
       JOIN Wallet_Transactions t ON r.transaction_id = t.transaction_id
       ORDER BY r.created_at DESC`
    );

    return res.status(200).json({ refunds });
  } catch (err) {
    console.error('Error fetching refunds:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// 📌 3. Admin processes a refund (approve or reject)
exports.processRefund = async (req, res) => {
  const { id } = req.params; // refund_id
  let { status, admin_reason } = req.body || {};

  // Normalize status (trim + lowercase)
  status = (status || '').trim().toLowerCase();

  const validStatus = ['processed', 'rejected'];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Use "processed" or "rejected".' });
  }

  try {
    // Update refund with status, processed_at, and admin_reason
    const [result] = await db.query(
      'UPDATE Refunds SET status = ?, processed_at = NOW(), admin_reason = ? WHERE refund_id = ? AND status = "pending"',
      [status, admin_reason || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Refund request not found or already processed' });
    }

    // If approved, deposit amount back to user's wallet
    if (status === 'processed') {
      const [refundRows] = await db.query(
        'SELECT amount, user_id FROM Refunds WHERE refund_id = ?',
        [id]
      );

      if (refundRows.length > 0) {
        const { amount, user_id } = refundRows[0];

        // Get user's wallet ID
        const [walletRows] = await db.query(
          'SELECT wallet_id FROM Wallets WHERE user_id = ?',
          [user_id]
        );

        if (walletRows.length > 0) {
          const wallet_id = walletRows[0].wallet_id;

          // deposit the wallet with a new transaction
          await db.query(
            'INSERT INTO Wallet_Transactions (transaction_id, wallet_id, amount, type, status) VALUES (?, ?, ?, ?, ?)',
            [uuid.v4(), wallet_id, amount, 'deposit', 'completed']
          );
        }
      }
    }

    return res.status(200).json({ message: `Refund ${status}` });
  } catch (err) {
    console.error('Error processing refund:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};


// 📌 4. User gets their refund history
exports.getUserRefunds = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [refunds] = await db.query(
      'SELECT * FROM Refunds WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );

    return res.status(200).json({ refunds });
  } catch (err) {
    console.error('Error fetching user refunds:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
