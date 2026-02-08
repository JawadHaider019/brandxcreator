const db = require('../config/db');
const uuid = require('uuid');

// Create a notification
exports.sendNotification = async (user_id, type, message, title = null) => {
  const notification_id = uuid.v4();
  const sent_at = new Date();

  await db.query(
    'INSERT INTO Notifications (notification_id, user_id, type, title, message, sent_at) VALUES (?, ?, ?, ?, ?, ?)',
    [notification_id, user_id, type, title, message, sent_at]
  );
};

// Fetch all notifications for the logged-in user
exports.getNotifications = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [notifications] = await db.query(
      'SELECT * FROM Notifications WHERE user_id = ? ORDER BY sent_at DESC',
      [user_id]
    );
    res.status(200).json({ notifications });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;

  try {
    const [result] = await db.query(
      'UPDATE Notifications SET is_read = TRUE WHERE notification_id = ? AND user_id = ?',
      [id, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get unread notifications count
exports.getUnreadCount = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [rows] = await db.query(
      'SELECT COUNT(*) AS unreadCount FROM Notifications WHERE user_id = ? AND is_read = FALSE',
      [user_id]
    );
    res.status(200).json({ unreadCount: rows[0].unreadCount });
  } catch (err) {
    console.error('Error fetching unread count:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [result] = await db.query(
      'UPDATE Notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
      [user_id]
    );
    res.status(200).json({ message: 'All notifications marked as read', updated: result.affectedRows });
  } catch (err) {
    console.error('Error marking all as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a single notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;

  try {
    const [result] = await db.query(
      'DELETE FROM Notifications WHERE notification_id = ? AND user_id = ?',
      [id, user_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete all notifications for the user
exports.deleteAllNotifications = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [result] = await db.query(
      'DELETE FROM Notifications WHERE user_id = ?',
      [user_id]
    );
    res.status(200).json({ message: 'All notifications deleted', deleted: result.affectedRows });
  } catch (err) {
    console.error('Error deleting all notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
