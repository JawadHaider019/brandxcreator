const express = require('express');
const router = express.Router();
const {
  createInfluencerProfile,
  createBrandProfile,
  updateInfluencerProfile,
   updateBrandProfile,
} = require('../controllers/profileController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { allowRole } = require('../middlewares/roleMiddleware');

// Influencer Profile Route
router.post('/influencer', verifyToken, allowRole('influencer'), createInfluencerProfile);
router.put('/influencer', verifyToken, allowRole('influencer'), updateInfluencerProfile);
// Brand Profile Route
router.post('/brand', verifyToken, allowRole('brand'), createBrandProfile);
router.put('/brand', verifyToken, allowRole('brand'), updateBrandProfile);
module.exports = router;
