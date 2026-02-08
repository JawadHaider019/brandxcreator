// controllers/contractController.js

const db = require('../config/db');

exports.agreeToContract = async (req, res) => {
  const user_id = req.user.user_id;
  const { contract_id } = req.params;

  try {
    // 1. Get user role
    const [userRows] = await db.query(
      `SELECT role FROM Users WHERE user_id = ?`,
      [user_id]
    );
    if (userRows.length === 0)
      return res.status(404).json({ message: 'User not found' });

    const user = userRows[0];

    // 2. Get contract details
    const [contractRows] = await db.query(
      `SELECT campaign_influencer_id, brand_signed, influencer_signed FROM Contracts WHERE contract_id = ?`,
      [contract_id]
    );
    if (contractRows.length === 0)
      return res.status(404).json({ message: 'Contract not found' });

    const contract = contractRows[0];

    // 3. Get influencer_id and campaign_id from Escrow_Payments using campaign_influencer_id
    const [escrowRows] = await db.query(
      `SELECT influencer_id, campaign_id FROM Escrow_Payments WHERE campaign_influencer_id = ?`,
      [contract.campaign_influencer_id]
    );
    if (escrowRows.length === 0)
      return res.status(404).json({ message: 'No related escrow payment found for this contract.' });

    const { influencer_id, campaign_id } = escrowRows[0];

    // 4. Get brand_id from Campaigns table using campaign_id
    const [campaignRows] = await db.query(
      `SELECT brand_id FROM Campaigns WHERE campaign_id = ?`,
      [campaign_id]
    );
    if (campaignRows.length === 0)
      return res.status(404).json({ message: 'Campaign not found.' });

    const { brand_id } = campaignRows[0];

    // 5. Determine who is signing
    let columnToUpdate;

    if (user.role === 'brand' && user_id === brand_id) {
      if (contract.brand_signed) {
        return res.status(400).json({ message: 'You have already agreed to this contract.' });
      }
      columnToUpdate = 'brand_signed';
    } else if (user.role === 'influencer' && user_id === influencer_id) {
      if (contract.influencer_signed) {
        return res.status(400).json({ message: 'You have already agreed to this contract.' });
      }
      columnToUpdate = 'influencer_signed';
    } else {
      return res.status(403).json({ message: 'You are not authorized to sign this contract.' });
    }

    // 6. Update the contract as signed
    const [result] = await db.query(
      `UPDATE Contracts SET ${columnToUpdate} = TRUE WHERE contract_id = ?`,
      [contract_id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to update contract signing status.' });
    }

    res.status(200).json({ message: `${columnToUpdate.replace('_', ' ')} successfully.` });

  } catch (error) {
    console.error('Error agreeing to contract:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
