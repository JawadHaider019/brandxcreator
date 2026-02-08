const express = require('express');
const router = express.Router();
const adminVerifyController = require('../controllers/adminVerifyController');
const adminAuth = require('../middlewares/adminAuthMiddleware'); 
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// Protect all admin verification routes
router.get('/pending-users', adminAuthMiddleware, adminVerifyController.getPendingUsers);
router.post('/user-verification/:user_id', adminAuthMiddleware, adminVerifyController.verifyUserStatus);

module.exports = router;
