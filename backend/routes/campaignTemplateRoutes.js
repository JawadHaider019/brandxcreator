const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuthMiddleware'); // Import middleware
const campaignTemplateController = require('../controllers/campaignTemplateController');

// Only admins can create, update, or delete templates
router.post('/create', adminAuth, campaignTemplateController.createTemplate); // Apply middleware
router.put('/update/:template_id', adminAuth, campaignTemplateController.updateTemplate);
router.get('/all-templates', campaignTemplateController.getAllTemplates);
router.get('/:template_id', campaignTemplateController.getTemplateById);

module.exports = router;
