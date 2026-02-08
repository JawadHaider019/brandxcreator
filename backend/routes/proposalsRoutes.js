const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/ProposalController');
const {verifyToken} = require('../middlewares/authMiddleware');

// Influencer submits proposal
router.post('/submit', verifyToken, proposalController.submitProposal);

// Brand views proposals on a campaign
router.get('/campaign/:campaign_id', verifyToken, proposalController.getCampaignProposals);

// Brand approves/rejects a proposal
router.patch('/:proposal_id/status', verifyToken, proposalController.updateProposalStatus);

module.exports = router;
