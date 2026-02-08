const db = require('../config/db');

// 1. Get All Published Campaigns Not Joined by Influencer
exports.getAllActiveCampaigns = async (req, res) => {
  const influencer_id = req.user.user_id;

  try {
    const query = `
      SELECT * FROM Campaigns
      WHERE status = 'published'
      AND campaign_id NOT IN (
        SELECT campaign_id FROM Campaign_Influencers WHERE influencer_id = ?
      )
    `;
    const [campaigns] = await db.query(query, [influencer_id]);
    res.json({ campaigns });
  } catch (err) {
    console.error('Error fetching all campaigns:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 2. Get Campaigns Matching Influencer Interests
exports.getInterestBasedCampaigns = async (req, res) => {
  const influencer_id = req.user.user_id;

  try {
    const [influencerRows] = await db.query(
      'SELECT interests FROM InfluencerProfiles WHERE user_id = ?',
      [influencer_id]
    );

    if (influencerRows.length === 0) {
      return res.status(404).json({ message: 'Influencer profile not found' });
    }

    let interests = influencerRows[0].interests;

    if (!interests) {
      return res.status(400).json({ message: 'Influencer has no interests set' });
    }

    if (typeof interests === 'string') {
      interests = JSON.parse(interests);
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ message: 'Influencer interests are empty or invalid' });
    }

    const placeholders = interests.map(() => '?').join(',');

    const query = `
      SELECT * FROM Campaigns
      WHERE status = 'published'
      AND JSON_OVERLAPS(tags, JSON_ARRAY(${placeholders}))
      AND campaign_id NOT IN (
        SELECT campaign_id FROM Campaign_Influencers WHERE influencer_id = ?
      )
    `;

    const [campaigns] = await db.query(query, [...interests, influencer_id]);

    res.json({ campaigns });
  } catch (err) {
    console.error('Error fetching interest-based campaigns:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
