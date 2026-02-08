const express = require('express');
const router = express.Router();
const {
  getInterestBasedCampaigns,
  getAllActiveCampaigns,
} = require('../controllers/discoverCampaignController');
const {verifyToken}= require('../middlewares/authMiddleware');

// Route 1: Campaigns matching influencer interests
router.get('/discover-campaigns/interests', verifyToken, getInterestBasedCampaigns);

// Route 2: All active campaigns
router.get('/discover-campaigns/all', verifyToken, getAllActiveCampaigns);

module.exports = router;
