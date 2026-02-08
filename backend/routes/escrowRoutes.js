const express = require('express');
const router = express.Router();
const { EscrowPayment } = require('../controllers/EscrowController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/create', verifyToken(['brand']), EscrowPayment);

module.exports = router;
