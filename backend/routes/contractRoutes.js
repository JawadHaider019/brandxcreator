const { verifyToken } = require('../middlewares/authMiddleware');
const contractController = require('../controllers/ContractController');
const express = require('express');
const router = express.Router();

// Allow only users with role 'brand' or 'influencer'
router.put('/contracts/:contract_id/agree', verifyToken(['brand', 'influencer']), contractController.agreeToContract);

module.exports = router;
