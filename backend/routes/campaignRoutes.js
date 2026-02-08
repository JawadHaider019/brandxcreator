const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { allowRole } = require('../middlewares/roleMiddleware');

// Route to create a campaign (only brand users allowed)
router.post('/create', verifyToken, allowRole('brand'), campaignController.createCampaign);

// Route to update a campaign (only logged-in users — typically brand owners — allowed)
router.put('/:campaign_id', verifyToken, allowRole('brand'), campaignController.updateCampaign)

module.exports = router;
