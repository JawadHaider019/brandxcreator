const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Helper function to check if the subscription has expired
const isSubscriptionExpired = (end_date) => {
  const currentDate = new Date();
  return new Date(end_date) < currentDate;
};

// Helper function to check if the user already has an active subscription
const hasActiveSubscription = async (user_id) => {
  const [subscriptionRows] = await db.query(
    'SELECT * FROM User_Subscriptions WHERE user_id = ? AND is_active = true',
    [user_id]
  );
  return subscriptionRows.length > 0;
};

const getActiveSubscription = async (user_id) => {
  const [subscriptionRows] = await db.query(
    `SELECT us.*, sp.access_templates 
     FROM User_Subscriptions us
     JOIN Subscription_Plans sp ON us.plan_id = sp.plan_id
     WHERE us.user_id = ? AND us.is_active = true`,
    [user_id]
  );

  const subscription = subscriptionRows[0];
  if (!subscription) return null;

  // Check expiration
  if (isSubscriptionExpired(subscription.end_date)) {
    return null;
  }

  return subscription;
};



// Subscribe to a plan
exports.subscribeToPlan = async (req, res) => {
  const user_id = req.user.user_id;
  const { plan_id } = req.body;

  try {
    // Verify user is a brand
    const [userRows] = await db.query('SELECT role FROM Users WHERE user_id = ?', [user_id]);
    const user = userRows[0];

    if (!user || user.role !== 'brand') {
      return res.status(403).json({ error: 'Only brands can subscribe to a plan' });
    }

    // Check if the user already has an active subscription
    const activeSubscription = await hasActiveSubscription(user_id);
    if (activeSubscription) {
      return res.status(400).json({
        error: 'You already have an active subscription. Please wait until it expires or unsubscribe to subscribe to a new plan.'
      });
    }

    // Fetch the subscription plan
    const [planRows] = await db.query('SELECT * FROM Subscription_Plans WHERE plan_id = ?', [plan_id]);
    const plan = planRows[0];

    if (!plan) {
      return res.status(404).json({ error: 'Subscription plan not found' });
    }

    // Fetch the user's wallet
    const [walletRows] = await db.query('SELECT * FROM Wallets WHERE user_id = ?', [user_id]);
    const wallet = walletRows[0];

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Do not proceed if wallet has insufficient balance
    if (parseFloat(wallet.balance) < parseFloat(plan.price)) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // Deduct the subscription price from the wallet
    await db.query(
      'UPDATE Wallets SET balance = balance - ? WHERE wallet_id = ?',
      [plan.price, wallet.wallet_id]
    );

    // Create a new transaction record
    const transaction_id = uuidv4();
    await db.query(
      `INSERT INTO Wallet_Transactions 
        (transaction_id, wallet_id, type, amount, status, verification_status, reference_note) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        transaction_id,
        wallet.wallet_id,
        'subscription_payment',
        plan.price,
        'completed',
        'approved',
        `Subscription payment for plan: ${plan.name}`
      ]
    );

    // Create new subscription
    const subscription_id = uuidv4();
    const start_date = new Date();
    const end_date = new Date();
    end_date.setDate(start_date.getDate() + plan.duration_days);  // Plan duration in days

    await db.query(
      `INSERT INTO User_Subscriptions 
        (subscription_id, user_id, plan_id, start_date, end_date, is_active) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [subscription_id, user_id, plan_id, start_date, end_date, true]
    );

    // Respond with success
    res.status(200).json({
      message: 'Subscription successful',
      plan: plan.name,
      price: plan.price,
      start_date,
      end_date
    });

  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Unsubscribe from the current plan
exports.unsubscribeFromPlan = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    // Fetch the user's active subscription
    const activeSubscription = await getActiveSubscription(user_id);
    if (!activeSubscription) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    // Deactivate the current subscription (unsubscribe)
    await db.query(
      'UPDATE User_Subscriptions SET is_active = false WHERE subscription_id = ?',
      [activeSubscription.subscription_id]
    );

    // Respond with success
    res.status(200).json({
      message: 'Successfully unsubscribed from the plan',
      plan: activeSubscription.plan_id,
      start_date: activeSubscription.start_date,
      end_date: activeSubscription.end_date
    });

  } catch (err) {
    console.error('Unsubscribe error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
