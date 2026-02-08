const express = require('express');
const router = express.Router();
const { WorkReview } = require('../controllers/WorkReviewController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.put('/campaigns/:campaign_influencer_id/review-work', verifyToken(['brand']), WorkReview);

module.exports = router;
