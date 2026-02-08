const express = require('express');
const router = express.Router();
const { deposit } = require('../controllers/walletController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { allowRole } = require('../middlewares/roleMiddleware');

// Deposit route (only accessible by brands)
router.post('/deposit', verifyToken, allowRole('brand'), deposit);

module.exports = router;
