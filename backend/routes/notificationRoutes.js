const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware');
const {
  getNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} = require('../controllers/notificationController');

// Routes
router.get('/', verifyToken(['brand', 'influencer']), getNotifications);
router.get('/unread-count', verifyToken(['brand', 'influencer']), getUnreadCount);
router.patch('/mark-as-read/:id', verifyToken(['brand', 'influencer']), markAsRead);
router.patch('/mark-all-read', verifyToken(['brand', 'influencer']), markAllAsRead);
router.delete('/:id', verifyToken(['brand', 'influencer']), deleteNotification);
router.delete('/', verifyToken(['brand', 'influencer']), deleteAllNotifications);

module.exports = router;
