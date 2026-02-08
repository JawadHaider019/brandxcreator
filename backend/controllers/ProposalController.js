const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Influencer submits a proposal
exports.submitProposal = async (req, res) => {
  const influencer_id = req.user.user_id;
  const { campaign_id, quoted_price, delivery_time, message } = req.body;

  try {
    const [existing] = await db.query(
      `SELECT * FROM Proposals WHERE campaign_id = ? AND influencer_id = ?`,
      [campaign_id, influencer_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Proposal already submitted.' });
    }

    const proposal_id = uuidv4();

    await db.query(
      `INSERT INTO Proposals (proposal_id, campaign_id, influencer_id, quoted_price, delivery_time, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [proposal_id, campaign_id, influencer_id, quoted_price, delivery_time, message]
    );

    res.status(201).json({ message: 'Proposal submitted successfully.' });
  } catch (err) {
    console.error('Error submitting proposal:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Brand views all proposals for their campaign
exports.getCampaignProposals = async (req, res) => {
  const brand_id = req.user.user_id;
  const campaign_id = req.params.campaign_id;

  try {
    const [campaign] = await db.query(
      `SELECT * FROM Campaigns WHERE campaign_id = ? AND brand_id = ?`,
      [campaign_id, brand_id]
    );

    if (campaign.length === 0) {
      return res.status(403).json({ message: 'Unauthorized or campaign not found.' });
    }

    const [proposals] = await db.query(
      `SELECT P.*, U.full_name, U.email FROM Proposals P
       JOIN Users U ON P.influencer_id = U.user_id
       WHERE P.campaign_id = ?`,
      [campaign_id]
    );

    res.json({ proposals });
  } catch (err) {
    console.error('Error fetching proposals:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Brand approves or rejects a proposal
exports.updateProposalStatus = async (req, res) => {
  const { proposal_id } = req.params;
  const { status } = req.body;

  // Validate status - only 'approved' or 'rejected' allowed for Proposals.status
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    // 1. Update the proposal status
    const updateProposalQuery = `
      UPDATE Proposals
      SET status = ?
      WHERE proposal_id = ?
      AND status = 'pending'  -- only update if currently pending
    `;
    const [result] = await db.query(updateProposalQuery, [status, proposal_id]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'Proposal not found or already processed' });
    }

    // 2. Fetch proposal details (campaign_id, influencer_id)
    const [proposalRows] = await db.query(
      'SELECT campaign_id, influencer_id FROM Proposals WHERE proposal_id = ?',
      [proposal_id]
    );
    const { campaign_id, influencer_id } = proposalRows[0];

    if (status === 'approved') {
      // 3. Insert or update Campaign_Influencers status to 'accepted'
      const [ciRows] = await db.query(
        'SELECT id FROM Campaign_Influencers WHERE campaign_id = ? AND influencer_id = ?',
        [campaign_id, influencer_id]
      );

      if (ciRows.length === 0) {
        // Insert new record with status 'accepted'
        const newId = uuidv4();
        await db.query(
          `INSERT INTO Campaign_Influencers
           (id, campaign_id, influencer_id, proposal_id, status, payment_status, content_status, start_date, created_at)
           VALUES (?, ?, ?, ?, 'accepted', 'unpaid', 'in_progress', NOW(), NOW())`,
          [newId, campaign_id, influencer_id, proposal_id]
        );
      } else {
        // Update existing record status to 'accepted'
        await db.query(
          `UPDATE Campaign_Influencers
           SET status = 'accepted'
           WHERE campaign_id = ? AND influencer_id = ?`,
          [campaign_id, influencer_id]
        );
      }

      // 4. Count accepted influencers in campaign
      const [countRows] = await db.query(
        `SELECT COUNT(*) AS acceptedCount
         FROM Campaign_Influencers
         WHERE campaign_id = ? AND status = 'accepted'`,
        [campaign_id]
      );
      const acceptedCount = countRows[0].acceptedCount;

      // 5. Fetch campaign info
      const [campaignRows] = await db.query(
        `SELECT number_of_influencers, status FROM Campaigns WHERE campaign_id = ?`,
        [campaign_id]
      );
      const { number_of_influencers, status: campaignStatus } = campaignRows[0];

      // 6. Update campaign status accordingly
      if (campaignStatus === 'published' && acceptedCount > 0) {
        // Move to in_progress on first accepted influencer
        await db.query(
          `UPDATE Campaigns SET status = 'in_progress' WHERE campaign_id = ?`,
          [campaign_id]
        );
      }

      if (acceptedCount >= number_of_influencers) {
        // Move to closed when limit reached
        await db.query(
          `UPDATE Campaigns SET status = 'closed' WHERE campaign_id = ?`,
          [campaign_id]
        );
      }
    }

    if (status === 'rejected') {
      // Optionally, update Campaign_Influencers status to 'rejected' if exists
      await db.query(
        `UPDATE Campaign_Influencers
         SET status = 'rejected'
         WHERE campaign_id = ? AND influencer_id = ?`,
        [campaign_id, influencer_id]
      );
    }

    res.json({ message: `Proposal ${status} successfully.` });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
