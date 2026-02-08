const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.EscrowPayment = async (req, res) => {
  const brand_id = req.user.user_id; // Authenticated brand
  const { campaign_id, influencer_id, amount, notes } = req.body;

  try {
    // Step 1: Verify brand owns the campaign
    const [campaignRows] = await db.query(
      `SELECT * FROM Campaigns WHERE campaign_id = ? AND brand_id = ?`,
      [campaign_id, brand_id]
    );

    if (campaignRows.length === 0) {
      return res.status(403).json({ message: 'Unauthorized: Campaign not found or not owned by you.' });
    }

    const campaign = campaignRows[0];

    // Step 2: Get Campaign_Influencers entry
    const [ciRows] = await db.query(
      `SELECT id FROM Campaign_Influencers WHERE campaign_id = ? AND influencer_id = ? AND status = 'accepted'`,
      [campaign_id, influencer_id]
    );

    if (ciRows.length === 0) {
      return res.status(400).json({ message: 'Influencer not accepted for this campaign.' });
    }

    const campaign_influencer_id = ciRows[0].id;

    // Step 3: Check if escrow already exists
    const [escrowExists] = await db.query(
      `SELECT * FROM Escrow_Payments WHERE campaign_influencer_id = ?`,
      [campaign_influencer_id]
    );

    if (escrowExists.length > 0) {
      return res.status(400).json({ message: 'Escrow already created for this influencer.' });
    }

    // Step 4: Check wallet balance
    const [[wallet]] = await db.query(
      `SELECT balance FROM Wallets WHERE user_id = ?`,
      [brand_id]
    );

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance.' });
    }

    // Step 5: Deduct balance from wallet
    await db.query(
      `UPDATE Wallets SET balance = balance - ? WHERE user_id = ?`,
      [amount, brand_id]
    );

    // Step 6: Log the transaction
    const transaction_id = uuidv4();
await db.query(
  `INSERT INTO Wallet_Transactions 
   (transaction_id, user_id, amount, type, status, reference_id, description)
   VALUES (?, ?, ?, 'lock', 'completed', ?, 'Escrow payment locked for campaign')`,
  [transaction_id, brand_id, amount, campaign_id]
);


    // Step 7: Create escrow record
    const escrow_id = uuidv4();
    await db.query(
      `INSERT INTO Escrow_Payments
       (escrow_id, campaign_id, influencer_id, campaign_influencer_id, amount, status, notes)
       VALUES (?, ?, ?, ?, ?, 'locked', ?)`,
      [escrow_id, campaign_id, influencer_id, campaign_influencer_id, amount, notes || null]
    );

    // Update payment_status in Campaign_Influencers
    await db.query(
      `UPDATE Campaign_Influencers SET payment_status = 'locked' WHERE campaign_id = ? AND influencer_id = ?`,
      [campaign_id, influencer_id]
    );

    // Step 8: Fetch brand and influencer names
    const [[brandUser]] = await db.query(
      `SELECT full_name FROM Users WHERE user_id = ?`,
      [brand_id]
    );
    const brand_name = brandUser?.full_name || 'Brand';

    const [[influencerUser]] = await db.query(
      `SELECT full_name FROM Users WHERE user_id = ?`,
      [influencer_id]
    );
    const influencer_name = influencerUser?.full_name || 'Influencer';

    // Step 9: Generate and insert contract
    const contract_id = uuidv4();
    const contract_date = new Date().toISOString().split('T')[0];
    const unique_contract_code = `BX-${escrow_id.substring(0, 8).toUpperCase()}`;
    const scope_of_work = campaign.brief;
    const timeline = campaign.timeline;
    const campaign_title = campaign.title;

    const termsText = `
CONTRACT AGREEMENT

This contract ("Agreement") is entered into on ${contract_date} between:

Brand: ${brand_name}
Influencer: ${influencer_name}

Campaign: "${campaign_title}"
Campaign Code: ${unique_contract_code}

Scope of Work:
${scope_of_work}

Timeline:
${timeline}

Payment Terms:
A total of PKR ${amount} has been placed in escrow and will be released upon successful campaign delivery and approval.

Intellectual Property Rights:
Content created will be co-owned by both parties for marketing and promotional purposes, unless otherwise stated.

Confidentiality:
Both parties agree not to disclose any confidential information shared as part of the campaign.

Termination Clause:
This agreement may be terminated by mutual agreement. In case of breach or failure to deliver, escrow will be refunded or withheld as per the platform's dispute policy.

Agreement:
By checking the acceptance box in the BrandXCreator platform, both parties agree to the terms outlined above.

Brand Signature: ✔️ (via checkbox)
Influencer Signature: ✔️ (via checkbox)
`;

    await db.query(
      `INSERT INTO Contracts 
      (contract_id, campaign_influencer_id, terms, payment_amount, timeline, contract_date, unique_contract_code, scope_of_work) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        contract_id,
        campaign_influencer_id,
        termsText,
        amount,
        timeline,
        contract_date,
        unique_contract_code,
        scope_of_work
      ]
    );

    res.status(201).json({
      message: 'Escrow payment created and locked successfully. Contract generated.',
      contract_id: contract_id
    });

  } catch (error) {
    console.error('Error creating escrow payment and contract:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
