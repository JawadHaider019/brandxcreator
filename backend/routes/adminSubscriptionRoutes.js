const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuthMiddleware'); 
const adminsubscriptionController = require('../controllers/adminsubscriptionController');

// Only admins can access these routes
router.post('/create-plan', adminAuth, adminsubscriptionController.createSubscription);
router.put('/update-plan/:plan_id', adminAuth, adminsubscriptionController.updateSubscription);
router.delete('/delete-plan/:plan_id', adminAuth, adminsubscriptionController.deleteSubscription);
router.get('/all-plans', adminAuth, adminsubscriptionController.getAllSubscriptions);

module.exports = router;
