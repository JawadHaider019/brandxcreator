const express = require('express');
const router = express.Router();
const { WorkComplete } = require('../controllers/WorkCompleteController');
const {verifyToken} = require('../middlewares/authMiddleware');

// router.put('/campaigns/:campaign_influencer_id/mark-complete', verifyToken, WorkComplete);
router.put('/campaigns/:campaign_influencer_id/mark-complete', verifyToken(['influencer']), WorkComplete);


module.exports = router;
