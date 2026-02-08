const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refundController');
const {verifyToken} = require('../middlewares/authMiddleware'); 
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware'); 

// User routes
router.post('/request', verifyToken(['brand']), refundController.requestRefund);
router.get('/my-refunds', verifyToken(['brand']), refundController.getUserRefunds);

// Admin routes
router.get('/', adminAuthMiddleware, refundController.getAllRefunds);
router.patch('/:id/process', adminAuthMiddleware, refundController.processRefund);


module.exports = router;
