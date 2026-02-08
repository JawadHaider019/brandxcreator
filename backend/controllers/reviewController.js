const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

exports.submitReview = async (req, res) => {
  const { campaign_influencer_id } = req.params;
  const { stars, feedback } = req.body;
  const fromUser = req.user;

  if (!stars || stars < 1 || stars > 5) {
    return res.status(400).json({ error: 'Stars must be between 1 and 5' });
  }

  try {
    // 1. Fetch the campaign_influencer entry
    const [rows] = await db.query(
      `SELECT ci.*, c.brand_id 
       FROM Campaign_Influencers ci
       JOIN Campaigns c ON ci.campaign_id = c.campaign_id
       WHERE ci.id = ?`,
      [campaign_influencer_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Campaign influencer record not found' });
    }

    const record = rows[0];

    let toUserId;
    if (fromUser.role === 'brand') {
      if (record.brand_id !== fromUser.user_id) {
        return res.status(403).json({ error: 'You are not authorized to review this influencer' });
      }
      toUserId = record.influencer_id;
    } else if (fromUser.role === 'influencer') {
      if (record.influencer_id !== fromUser.user_id) {
        return res.status(403).json({ error: 'You are not authorized to review this brand' });
      }
      toUserId = record.brand_id;
    } else {
      return res.status(403).json({ error: 'Invalid role' });
    }

    // 2. Prevent duplicate review
    const [existing] = await db.query(
      `SELECT * FROM User_Reviews 
       WHERE from_user_id = ? AND campaign_influencer_id = ?`,
      [fromUser.user_id, campaign_influencer_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'You have already submitted a review for this campaign' });
    }

    // 3. Insert the review
    await db.query(
      `INSERT INTO User_Reviews 
         (review_id, from_user_id, to_user_id, campaign_influencer_id, stars, feedback) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        fromUser.user_id,
        toUserId,
        campaign_influencer_id,
        stars,
        feedback || null
      ]
    );

    return res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('SubmitReview Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
