const db = require('../config/db');

exports.WorkComplete = async (req, res) => {
  console.log('[WorkComplete] API called');

  const { campaign_influencer_id } = req.params;
  const { note } = req.body;
  const userId = req.user?.user_id;

  console.log('[Params]', { campaign_influencer_id });
  console.log('[Auth]', { userId });

  // If no user ID is found from token
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized, missing user info' });
  }

  try {
    // Check if the influencer is part of this campaign
    const [rows] = await db.query(
      `SELECT * FROM Campaign_Influencers 
       WHERE id = ? AND influencer_id = ?`,
      [campaign_influencer_id, userId]
    );

    console.log('[DB Check]', rows);

    if (rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized or record not found' });
    }

    // ✅ Update completion flags and content status
    await db.query(
      `UPDATE Campaign_Influencers 
       SET 
         influencer_marked_complete = TRUE,
         influencer_completion_note = ?,
         influencer_completion_at = NOW(),
         content_status = 'completed'
       WHERE id = ?`,
      [note || null, campaign_influencer_id]
    );

    console.log('[Update] Work marked complete for campaign_influencer_id:', campaign_influencer_id);

    res.status(200).json({ message: 'Work marked as complete by influencer' });
  } catch (error) {
    console.error('[Error] WorkComplete failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
