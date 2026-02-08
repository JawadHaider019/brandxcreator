const db = require('../config/db'); // Database pool
const { v4: uuidv4 } = require('uuid');

// Create a new subscription plan
const createSubscription = async (req, res) => {
  try {
    const { name, price, duration, influencer_limit, features } = req.body;

    // Generate a unique ID for the subscription plan
    const plan_id = uuidv4();

    // Insert the subscription plan into the database
    await db.query(
      'INSERT INTO Subscription_Plans (plan_id, name, price, duration_days, influencer_limit, features) VALUES (?, ?, ?, ?, ?, ?)',
      [plan_id, name, price, duration, influencer_limit, features]
    );

    res.status(201).json({
      message: 'Subscription plan created successfully',
      plan_id,
    });
  } catch (err) {
    console.error('Error creating subscription plan:', err);
    res.status(500).json({ error: 'Failed to create subscription plan', details: err.message });
  }
};

// Update an existing subscription plan
const updateSubscription = async (req, res) => {
  try {
    const { plan_id } = req.params;
    const { name, price, duration_days, influencer_limit, features } = req.body;

    // Check if the subscription plan exists
    const [plan] = await db.query('SELECT * FROM Subscription_Plans WHERE plan_id = ?', [plan_id]);

    if (plan.length === 0) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }

    // Update the subscription plan
    await db.query(
      'UPDATE Subscription_Plans SET name = ?, price = ?, duration_days = ?, influencer_limit = ?, features = ? WHERE plan_id = ?',
      [name, price, duration_days, influencer_limit, features, plan_id]
    );

    res.status(200).json({
      message: 'Subscription plan updated successfully',
    });
  } catch (err) {
    console.error('Error updating subscription plan:', err);
    res.status(500).json({ error: 'Failed to update subscription plan', details: err.message });
  }
};

// Delete a subscription plan
const deleteSubscription = async (req, res) => {
  try {
    const { plan_id } = req.params;

    // Check if the subscription plan exists
    const [plan] = await db.query('SELECT * FROM Subscription_Plans WHERE plan_id = ?', [plan_id]);

    if (plan.length === 0) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }

    // Delete the subscription plan
    await db.query('DELETE FROM Subscription_Plans WHERE plan_id = ?', [plan_id]);

    res.status(200).json({
      message: 'Subscription plan deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting subscription plan:', err);
    res.status(500).json({ error: 'Failed to delete subscription plan', details: err.message });
  }
};

// Get all subscription plans
const getAllSubscriptions = async (req, res) => {
  try {
    const [plans] = await db.query('SELECT * FROM Subscription_Plans ORDER BY created_at DESC');
    res.status(200).json(plans);
  } catch (err) {
    console.error('Error fetching subscription plans:', err);
    res.status(500).json({ error: 'Failed to fetch subscription plans', details: err.message });
  }
};

module.exports = {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions,
};
