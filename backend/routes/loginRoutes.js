// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController.loginUser); // this should be POST

module.exports = router;
