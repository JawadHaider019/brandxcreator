const express = require('express');
const router = express.Router();
const paymentMethodsController = require('../controllers/paymentMethodsController');
const {verifyToken} = require('../middlewares/authMiddleware');

// Protect all routes (user must be logged in)
// router.use(verifyToken);
router.use(verifyToken(['brand', 'influencer']));


router.get('/', paymentMethodsController.getPaymentMethods);
router.post('/', paymentMethodsController.addPaymentMethod);
router.put('/:method_id', paymentMethodsController.updatePaymentMethod);
router.delete('/:method_id', paymentMethodsController.deletePaymentMethod);

module.exports = router;
