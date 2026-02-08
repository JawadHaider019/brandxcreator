const db = require('../config/db'); 
const { v4: uuidv4 } = require('uuid');

exports.WorkReview = async (req, res) => {
  const { campaign_influencer_id } = req.params;
  const { action, feedback } = req.body;
  const brandId = req.user?.user_id;

  if (!brandId) {
    return res.status(401).json({ error: 'Unauthorized: Missing brand ID' });
  }

  try {
    const [rows] = await db.query(
      `SELECT ci.*, c.brand_id 
       FROM Campaign_Influencers ci
       JOIN Campaigns c ON ci.campaign_id = c.campaign_id
       WHERE ci.id = ?`,
      [campaign_influencer_id]
    );

    if (rows.length === 0 || rows[0].brand_id !== brandId) {
      return res.status(403).json({ error: 'Unauthorized or not your campaign' });
    }

    const influencerData = rows[0];

    if (!influencerData.influencer_marked_complete) {
      return res.status(400).json({ error: 'Influencer has not marked work as complete' });
    }

    if (action === 'completed') {
      await db.query(
        `UPDATE Campaign_Influencers
         SET brand_verified = TRUE,
             brand_verified_at = NOW(),
             content_status = 'completed'
         WHERE id = ?`,
        [campaign_influencer_id]
      );

      const [escrowRows] = await db.query(
        `SELECT id, amount FROM Escrow_Payments 
         WHERE campaign_influencer_id = ? AND status = 'locked'`,
        [campaign_influencer_id]
      );

      if (escrowRows.length === 0) {
        return res.status(400).json({ error: 'No locked escrow payment found' });
      }

      const escrow = escrowRows[0];
      const amount = escrow.amount;

      const [walletRows] = await db.query(
        `SELECT wallet_id FROM Wallets WHERE user_id = ?`,
        [influencerData.influencer_id]
      );

      if (walletRows.length === 0) {
        return res.status(400).json({ error: 'Influencer wallet not found' });
      }

      const walletId = walletRows[0].wallet_id;
      const transactionId = uuidv4();

      await db.query(
        `INSERT INTO Wallet_Transactions 
           (transaction_id, wallet_id, type, amount, created_at)
         VALUES (?, ?, 'release', ?, NOW())`,
        [transactionId, walletId, amount]
      );

      await db.query(
        'UPDATE Wallets SET balance = balance + ? WHERE wallet_id = ?',
        [amount, walletId]
      );

      await db.query(
        `UPDATE Escrow_Payments
         SET status = 'released', release_date = NOW()
         WHERE campaign_influencer_id = ? AND status = 'locked'`,
        [campaign_influencer_id]
      );

      // ✅ Create Invoice
      const invoiceId = uuidv4();
      await db.query(
        `INSERT INTO Invoice_Payments (
          invoice_id, influencer_id, campaign_id, amount,
          payment_status, payment_method, payment_date, notes
        ) VALUES (?, ?, ?, ?, 'paid', 'wallet', NOW(), ?)`,
        [
          invoiceId,
          influencerData.influencer_id,
          influencerData.campaign_id,
          amount,
          'Escrow released to influencer by brand approval'
        ]
      );

      return res.status(200).json({ message: 'Work approved, payment released, and invoice generated' });

    } else if (action === 'needs_edit') {
      await db.query(
        `UPDATE Campaign_Influencers
         SET brand_feedback = ?,
             content_status = 'needs_edit',
             brand_verified = FALSE
         WHERE id = ?`,
        [feedback || null, campaign_influencer_id]
      );

      return res.status(200).json({ message: 'Revision requested from influencer' });
    } else {
      return res.status(400).json({ error: 'Invalid action. Use "completed" or "needs_edit"' });
    }

  } catch (error) {
    console.error('WorkReview Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
