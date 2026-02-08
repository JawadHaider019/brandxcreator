const db = require('../config/db');
const uuid = require('uuid');

exports.deposit = async (req, res) => {
  const { amount } = req.body;
  const user_id = req.user.user_id;

  // Check if amount is missing or not a positive number
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Deposit amount must be a positive number' });
  }

  try {
    // Ensure the user is a brand and has a wallet
    const [wallets] = await db.query('SELECT * FROM Wallets WHERE user_id = ?', [user_id]);
    if (wallets.length === 0) {
      return res.status(400).json({ error: 'Wallet not found for this user' });
    }

    const wallet_id = wallets[0].wallet_id;

    // Insert transaction record into Wallet_Transactions
    const transaction_id = uuid.v4();
    await db.query(
      'INSERT INTO Wallet_Transactions (transaction_id, wallet_id, type, amount, status, verification_status) VALUES (?, ?, ?, ?, ?, ?)',
      [transaction_id, wallet_id, 'deposit', amount, 'completed', 'approved']
    );

    // Update the wallet balance
    await db.query('UPDATE Wallets SET balance = balance + ? WHERE wallet_id = ?', [amount, wallet_id]);

    res.status(200).json({
      message: 'Fake deposit successful',
      deposited: amount,
    });
  } catch (err) {
    console.error('Error during deposit:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
