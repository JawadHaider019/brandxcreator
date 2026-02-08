const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { submitReview } = require('../controllers/reviewController');

// Allow both brands and influencers to access this route
router.post('/review/:campaign_influencer_id', verifyToken(['brand', 'influencer']), submitReview);

module.exports = router;
