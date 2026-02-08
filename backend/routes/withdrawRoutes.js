const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { withdraw } = require('../controllers/withdrawController');

router.post('/withdraw', verifyToken(['influencer']), withdraw);

module.exports = router;
