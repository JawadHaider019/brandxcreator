const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
const adminLoginRoutes = require('./routes/adminLoginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const adminVerifyRoutes = require('./routes/adminVerifyRoutes');
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const walletRoutes = require('./routes/walletRoutes');
const adminSubscriptionRoutes = require('./routes/adminSubscriptionRoutes');
const  subscriptionRoutes= require('./routes/subscriptionRoutes');
const campaignTemplateRoutes = require('./routes/campaignTemplateRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const discoverCampaignRoutes = require('./routes/discoverCampaignRoutes');
const proposalsRoutes = require('./routes/proposalsRoutes');
const escrowRoutes = require('./routes/escrowRoutes');
const contractRoutes = require('./routes/contractRoutes');
const messageRoutes = require('./routes/messageRoutes');
const WorkCompleteRoute = require('./routes/WorkCompleteRoute');
const WorkReviewRoute = require('./routes/WorkReviewRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const paymentMethodsRoutes = require('./routes/paymentMethodsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const refundRoutes = require('./routes/refundRoutes');


// API Routes
app.get('/', (req, res) => {
  res.send('Welcome to the BrandXCreator API');
});

app.use('/api', adminLoginRoutes);
app.use('/api/users', registerRoutes);
app.use('/api/admin', adminVerifyRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/admin/subscriptions', adminSubscriptionRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api/templates', campaignTemplateRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api', discoverCampaignRoutes);
app.use('/api/proposals', proposalsRoutes);
app.use('/escrow', escrowRoutes);
app.use('/api', contractRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', WorkCompleteRoute);
app.use('/api', WorkReviewRoute);
app.use('/api', reviewRoutes);
app.use('/api', withdrawRoutes);
app.use('/payment-methods', paymentMethodsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/refunds', refundRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
