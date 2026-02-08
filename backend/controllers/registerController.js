      const db = require('../config/db'); 
      const { v4: uuidv4 } = require('uuid');
      const bcrypt = require('bcryptjs');

      exports.registerUser = async (req, res) => {
        const {
          full_name,
          email,
          password,
          role,
          phone_number,
          gender,
          date_of_birth,
          city,
          social_links = [], 
          instagram_link,
          youtube_link,
          facebook_link,
          tiktok_link,
          snapchat_link,
          personal_website
        } = req.body;

        // Basic Validation
        if (!full_name || !email || !password || !role ||
            !phone_number || !gender || !date_of_birth || !city) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
        }

        // Password validation
        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Role validation
        if (!['brand', 'influencer'].includes(role)) {
          return res.status(400).json({ error: 'Invalid role: must be brand or influencer' });
        }

        try {
          // Check for existing user
          const [existingUserRows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
          const existingUser = existingUserRows[0];

          if (existingUser) {
            if (existingUser.verification_status === 'rejected') {
              await db.query('DELETE FROM Users WHERE email = ?', [email]);
            } else {
              return res.status(400).json({ error: 'Email already exists and is not rejected' });
            }
          }

          // Hash password and create user
          const hashedPassword = await bcrypt.hash(password, 10);
          const userId = uuidv4();

          // Single INSERT operation (no transaction needed)
          await db.query(
            `INSERT INTO Users 
            (user_id, full_name, email, password_hash, role, phone_number, 
              gender, date_of_birth, city, verification_status,
              social_links, instagram_link, youtube_link, facebook_link,
              tiktok_link, snapchat_link, personal_website) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)`,
            [
              userId, full_name, email, hashedPassword, role, phone_number,
              gender, date_of_birth, city,
              JSON.stringify(social_links), // Store array as JSON
              instagram_link || null,
              youtube_link || null,
              facebook_link || null,
              tiktok_link || null,
              snapchat_link || null,
              personal_website || null
            ]
          );

          // Create empty profile based on role
          if (role === 'influencer') {
            await db.query(
              `INSERT INTO InfluencerProfiles 
              (user_id) VALUES (?)`,
              [userId]
            );
          }

          res.status(201).json({ 
            message: 'User registered successfully. Awaiting approval.', 
            user_id: userId,
            role: role
          });

        } catch (err) {
          console.error('Registration Error:', err);
          res.status(500).json({ error: 'Registration failed', details: err.message });
        }
      };