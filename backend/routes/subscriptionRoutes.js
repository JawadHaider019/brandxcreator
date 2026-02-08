const express = require('express');
const router = express.Router();

const { subscribeToPlan, unsubscribeFromPlan } = require('../controllers/subscriptionController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { allowRole } = require('../middlewares/roleMiddleware');

// Subscribe to plan route (only for brands)
router.post('/subscribe', verifyToken, allowRole('brand'), subscribeToPlan);

// Unsubscribe route (also only for brands)
router.post('/unsubscribe', verifyToken, allowRole('brand'), unsubscribeFromPlan);

module.exports = router;
