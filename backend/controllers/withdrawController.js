const MIN_WITHDRAWAL_AMOUNT = 500; // minimum withdrawal amount in PKR
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

exports.withdraw = async (req, res) => {
  const userId = req.user.user_id;
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid withdrawal amount' });
  }

  if (amount < MIN_WITHDRAWAL_AMOUNT) {
    return res.status(400).json({ error: `Minimum withdrawal amount is ${MIN_WITHDRAWAL_AMOUNT} PKR` });
  }

  try {
    // Fetch user wallet info
    const [walletRows] = await db.query(
      'SELECT wallet_id, balance FROM Wallets WHERE user_id = ?',
      [userId]
    );

    if (walletRows.length === 0) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const wallet = walletRows[0];

    if (wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // Create withdrawal transaction (status completed)
    const transactionId = uuidv4();
    await db.query(
      `INSERT INTO Wallet_Transactions 
        (transaction_id, wallet_id, type, amount, status, created_at, updated_at)
       VALUES (?, ?, 'withdrawal', ?, 'completed', NOW(), NOW())`,
      [transactionId, wallet.wallet_id, amount]
    );

    // Deduct amount from wallet balance
    await db.query(
      `UPDATE Wallets SET balance = balance - ? WHERE wallet_id = ?`,
      [amount, wallet.wallet_id]
    );

    res.status(200).json({ message: 'Withdrawal request submitted successfully', transactionId });

  } catch (error) {
    console.error('Withdraw Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
