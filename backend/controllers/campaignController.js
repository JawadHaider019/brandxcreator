const db = require('../config/db'); // Import the database pool
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

// Predefined list of valid statuses for a campaign
const validStatuses = ['draft', 'published', 'closed'];

/**
 * Helper function to convert ISO date string to MySQL DATETIME format
 */
const formatDateForMySQL = (dateString) => {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date format');
  }
  return d.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * Create a new campaign
 */
const createCampaign = async (req, res) => {
  const {
    title,
    brief,
    content_type = null,
    tone = null,
    target_audience,
    budget,
    timeline = null,
    start_date,
    end_date,
    budget_range = null,
    template_id = null,
    tags = null
  } = req.body;

  const user_id = req.user.user_id; // from auth middleware

  try {
    // Check active subscription for influencer_limit
    const [subscriptionRows] = await db.query(
      `SELECT sp.influencer_limit FROM User_Subscriptions us 
       JOIN Subscription_Plans sp ON us.plan_id = sp.plan_id 
       WHERE us.user_id = ? AND us.is_active = TRUE AND us.end_date > NOW()`,
      [user_id]
    );

    if (subscriptionRows.length === 0) {
      return res.status(403).json({ message: 'No active subscription found or subscription expired.' });
    }

    const influencer_limit = subscriptionRows[0].influencer_limit;

    // Format dates for MySQL
    const formattedStartDate = formatDateForMySQL(start_date);
    const formattedEndDate = formatDateForMySQL(end_date);

    // Handle tags JSON string or null
    const tagsString = tags ? JSON.stringify(tags) : null;

    // Create campaign ID
    const campaign_id = uuidv4();

    await db.query(
      `INSERT INTO Campaigns (
        campaign_id, brand_id, created_by, title, brief, content_type, tone,
        target_audience, budget, timeline, start_date, end_date, budget_range,
        template_id, number_of_influencers, status, created_at, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        campaign_id,
        user_id,
        user_id,
        title,
        brief,
        content_type,
        tone,
        target_audience,
        budget,
        timeline,
        formattedStartDate,
        formattedEndDate,
        budget_range,
        template_id,
        influencer_limit,
        'draft',
        new Date(),
        tagsString
      ]
    );

    res.status(201).json({ message: 'Campaign created successfully', campaign_id });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
};


/**
 * Update an existing campaign
 */
const updateCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const {
      title,
      brief,
      content_type,
      tone,
      target_audience,
      budget,
      timeline,
      start_date,
      end_date,
      budget_range,
      template_id,
      status,
      tags
    } = req.body;

    const { user_id } = req.user;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    const [campaign] = await db.query(
      'SELECT * FROM Campaigns WHERE campaign_id = ? AND brand_id = ?',
      [campaign_id, user_id]
    );

    if (campaign.length === 0) {
      return res.status(404).json({ error: 'Campaign not found or not owned by you' });
    }

    const formattedStartDate = formatDateForMySQL(start_date);
    const formattedEndDate = formatDateForMySQL(end_date);

    const updatedData = {
      title,
      brief,
      content_type,
      tone,
      target_audience,
      budget,
      timeline,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      budget_range,
      template_id: template_id || null,
      tags: JSON.stringify(tags || []),
      status,
      updated_at: new Date()
    };

    await db.query(
      `UPDATE Campaigns 
       SET title = ?, brief = ?, content_type = ?, tone = ?, target_audience = ?, 
           budget = ?, timeline = ?, start_date = ?, end_date = ?, budget_range = ?, 
           template_id = ?, tags = ?, status = ?, updated_at = ? 
       WHERE campaign_id = ?`,
      [
        updatedData.title,
        updatedData.brief,
        updatedData.content_type,
        updatedData.tone,
        updatedData.target_audience,
        updatedData.budget,
        updatedData.timeline,
        updatedData.start_date,
        updatedData.end_date,
        updatedData.budget_range,
        updatedData.template_id,
        updatedData.tags,
        updatedData.status,
        updatedData.updated_at,
        campaign_id
      ]
    );

    res.status(200).json({ message: 'Campaign updated successfully' });
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(500).json({ error: 'Failed to update campaign', details: err.message });
  }
};

/**
 * Get all campaigns created by the logged-in brand
 */
const getBrandCampaigns = async (req, res) => {
  try {
    const { user_id } = req.user;

    const [campaigns] = await db.query(
      'SELECT * FROM Campaigns WHERE brand_id = ? ORDER BY created_at DESC',
      [user_id]
    );

    res.status(200).json(campaigns);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    res.status(500).json({ error: 'Failed to fetch campaigns', details: err.message });
  }
};

/**
 * Get a campaign by its ID
 */
const getCampaignById = async (req, res) => {
  try {
    const { campaign_id } = req.params;

    const [campaign] = await db.query(
      'SELECT * FROM Campaigns WHERE campaign_id = ?',
      [campaign_id]
    );

    if (campaign.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.status(200).json(campaign[0]);
  } catch (err) {
    console.error('Error fetching campaign:', err);
    res.status(500).json({ error: 'Failed to fetch campaign', details: err.message });
  }
};

module.exports = {
  createCampaign,
  updateCampaign,
  getBrandCampaigns,
  getCampaignById
};
