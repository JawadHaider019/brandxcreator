const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

exports.createMessageThread = async (req, res) => {
  try {
    const { campaign_id } = req.body;

    // Query to get brand_id and influencer_id via Campaign_Influencers table
    const [rows] = await db.query(
      `SELECT c.brand_id, ci.influencer_id
       FROM Campaigns c
       JOIN Campaign_Influencers ci ON c.campaign_id = ci.campaign_id
       WHERE c.campaign_id = ?`,
      [campaign_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Campaign or influencer not found' });
    }

    const { brand_id, influencer_id } = rows[0];

    // Check if thread already exists
    const [existing] = await db.query(
      'SELECT * FROM MessageThreads WHERE campaign_id = ?',
      [campaign_id]
    );

    if (existing.length > 0) {
      return res.status(200).json({ message: 'Thread already exists', thread: existing[0] });
    }

    // Create new thread
    const thread_id = uuidv4();
    await db.query(
      `INSERT INTO MessageThreads (thread_id, campaign_id, brand_id, influencer_id)
       VALUES (?, ?, ?, ?)`,
      [thread_id, campaign_id, brand_id, influencer_id]
    );

    res.status(201).json({ message: 'Message thread created', thread_id });
  } catch (error) {
    console.error('Create Thread Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
