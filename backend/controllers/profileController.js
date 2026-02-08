const db = require('../config/db');

// Influencer Profile Creation
exports.createInfluencerProfile = async (req, res) => {
  const {
    bio,
    profile_picture,
    category,
      interests,   
    audience_size,
    pricing_info,
    instagram_link,
    tiktok_link,
    location,
  } = req.body;

  const user_id = req.user.user_id;

  try {
    const [existing] = await db.query('SELECT * FROM InfluencerProfiles WHERE user_id = ?', [user_id]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Influencer profile already exists' });
    }

    await db.query(
      `INSERT INTO InfluencerProfiles 
        (user_id, bio, profile_picture, category, interests, audience_size, pricing_info, instagram_link, tiktok_link, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?)`,
      [user_id, bio, profile_picture, category, JSON.stringify(interests), audience_size, pricing_info, instagram_link, tiktok_link, location]
    );

    res.status(201).json({ message: 'Influencer profile created successfully' });
  } catch (err) {
    console.error('Error creating influencer profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateInfluencerProfile = async (req, res) => {
  const {
    bio,
    profile_picture,
    category,
    interests,
    audience_size,
    pricing_info,
    instagram_link,
    tiktok_link,
    location,
  } = req.body;

  const user_id = req.user.user_id;

  try {
    const [existing] = await db.query('SELECT * FROM InfluencerProfiles WHERE user_id = ?', [user_id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Influencer profile not found' });
    }

    await db.query(
      `UPDATE InfluencerProfiles SET 
        bio = ?,
        profile_picture = ?,
        category = ?,
        interests = ?,
        audience_size = ?,
        pricing_info = ?,
        instagram_link = ?,
        tiktok_link = ?,
        location = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?`,
      [
        bio,
        profile_picture,
        category,
        JSON.stringify(interests),
        audience_size,
        pricing_info,
        instagram_link,
        tiktok_link,
        location,
        user_id,
      ]
    );

    res.json({ message: 'Influencer profile updated successfully' });
  } catch (err) {
    console.error('Error updating influencer profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Brand Profile Creation
exports.createBrandProfile = async (req, res) => {
  const {
    bio,
    brand_name,
    logo_url,
    category,
    pricing_info,
    website,
  } = req.body;

  const user_id = req.user.user_id;

  try {
    const [existing] = await db.query('SELECT * FROM BrandProfiles WHERE user_id = ?', [user_id]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Brand profile already exists' });
    }

    await db.query(
      `INSERT INTO BrandProfiles 
        (user_id, bio, brand_name, logo_url, category, pricing_info, website)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, bio, brand_name, logo_url, category, pricing_info, website]
    );

    res.status(201).json({ message: 'Brand profile created successfully' });
  } catch (err) {
    console.error('Error creating brand profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBrandProfile = async (req, res) => {
  const {
    bio,
    brand_name,
    logo_url,
    category,
    pricing_info,
    website,
  } = req.body;

  const user_id = req.user.user_id;

  try {
    const [existing] = await db.query('SELECT * FROM BrandProfiles WHERE user_id = ?', [user_id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Brand profile not found' });
    }

    await db.query(
      `UPDATE BrandProfiles SET
        bio = ?,
        brand_name = ?,
        logo_url = ?,
        category = ?,
        pricing_info = ?,
        website = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?`,
      [bio, brand_name, logo_url, category, pricing_info, website, user_id]
    );

    res.json({ message: 'Brand profile updated successfully' });
  } catch (err) {
    console.error('Error updating brand profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
