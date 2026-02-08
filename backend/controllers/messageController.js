const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

exports.sendMessage = async (req, res) => {
  try {
    const { thread_id, sender_id, message_text, attachment_url, attachment_type } = req.body;

    const message_id = uuidv4();
    await db.query(
      `INSERT INTO Messages (
         message_id, thread_id, sender_id, message_text, attachment_url, attachment_type
       ) VALUES (?, ?, ?, ?, ?, ?)`,
      [message_id, thread_id, sender_id, message_text, attachment_url, attachment_type]
    );

    res.status(201).json({ message: 'Message sent', message_id });
  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const { thread_id } = req.params;

    const [messages] = await db.query(
      `SELECT * FROM Messages
       WHERE thread_id = ?
       ORDER BY sent_at ASC`,
      [thread_id]
    );

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Get Messages Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
