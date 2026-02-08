const express = require('express');
const router = express.Router();
const threadController = require('../controllers/messageThreadController');
const messageController = require('../controllers/messageController');

// Create message thread for a campaign
router.post('/thread', threadController.createMessageThread);

// Send a message in a thread
router.post('/send', messageController.sendMessage);

// Get all messages in a thread
router.get('/thread/:thread_id', messageController.getThreadMessages);

module.exports = router;
