import stripe from '../config/stripeConfig.js';
import { supabase } from '../config/supabaseClient.js';
const BillingController  = {
// Create a Stripe Customer
async createCustomer(req, res) {
  try {
    const { token, name, address, amount, currency, desc, purposeCode, userId } = req.body;

    // Validate address format
    const { line1, city, state, country, postal_code } = address;

    // Create a PaymentMethod from the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: { token: token.id },
    });

    // Create a Stripe Customer with the PaymentMethod and address details
    const customer = await stripe.customers.create({
      email: token.email,
      name,
      payment_method: paymentMethod.id,
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
      address: {
        line1,
        city,
        state,
        country,
        postal_code,
      },
    });

    // Attach the PaymentMethod to the Customer
    await stripe.paymentMethods.attach(paymentMethod.id, { customer: customer.id });

    // Create a Payment Intent with a description for export compliance
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      description: `Export transaction for ${desc}`, // Include description for export compliance
      payment_method: paymentMethod.id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
    });

    // Check if payment was successful
    if (paymentIntent.status === 'succeeded') {
      // Log the payment into the payments table
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert([{
          user_id: userId,
          amount_paid: amount / 100, // Convert from cents to dollars/euros
          payment_date: new Date(),
          payment_intent_id: paymentIntent.id,
          payment_customer_id: customer.id,
          status: 'succeeded',
        }]);

      if (paymentError) {
        throw new Error(`Failed to log payment: ${paymentError.message}`);
      }

      // Create a new invoice item for the customer with a description for export compliance
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customer.id,
        amount, // Amount in cents
        currency,
        description: `Export transaction for ${desc}`, // Include description for compliance
      });

      // Create the invoice with required metadata for export
      const invoice = await stripe.invoices.create({
        customer: customer.id,
        auto_advance: true, // Automatically finalize the invoice
        metadata: {
          purpose_code: purposeCode, // Required purpose code for export
        },
      });

      // Finalize the invoice
      const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

      // Respond with the customer, payment, and invoice details
      res.status(200).json({
        customer,
        paymentIntent,
        invoice: {
          invoiceId: finalizedInvoice.id,
          hostedInvoiceUrl: finalizedInvoice.hosted_invoice_url,
          pdfUrl: finalizedInvoice.invoice_pdf,
          status: finalizedInvoice.status,
        },
      });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},



// controllers/billingController.js
async createInvoice (req, res) {
    try {
      const { customerId, amt, desc } = req.body;
  
      // Create an invoice
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customerId,
        amount: amt, // Amount in cents ($10.00)
        currency: 'usd',
        description: desc,
      });
  
      const invoice = await stripe.invoices.create({
        customer: customerId,
        auto_advance: true, // Automatically finalize the invoice
      });
  
      res.status(200).json({ invoice });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
// Controller to create a Stripe Connect account
async createStripeAccount (req, res){
  try {
    // Create a new Stripe Connect account
    const account = await stripe.accounts.create({});

    // Return the created account's ID
    res.json({
      success: true,
      accountId: account.id,
    });
  } catch (error) {
    console.error(
      "Error occurred while creating a Stripe account:",
      error.message
    );
    res.status(500).json({
      success: false,
      error: "Failed to create Stripe account",
      details: error.message,
    });
  }
},
// Controller to create a Stripe account session for onboarding
async createAccountSession(req, res) {
  try {
    const { account } = req.body;

    // Ensure the account ID is provided
    if (!account) {
      return res.status(400).json({
        success: false,
        error: "Account ID is required",
      });
    }

    // Create an account session for onboarding
    const accountSession = await stripe.accountSessions.create({
      account: account,
      components: {
        account_onboarding: { enabled: true },
      },
    });

    // Return the session's client secret for secure onboarding
    res.json({
      success: true,
      accountSessionUrl: accountSession.url, // or accountSession.client_secret if needed
    });
  } catch (error) {
    console.error(
      "Error occurred while creating a Stripe account session:",
      error.message
    );
    res.status(500).json({
      success: false,
      error: "Failed to create Stripe account session",
      details: error.message,
    });
  }
},
async getStripeInvoice(req, res) {
  try {
    const { userId } = req.params; // Get the userId from the request parameters

    // Fetch the user's Stripe customer IDs from your database
    const { data: userData, error: userError } = await supabase
      .from('payments')
      .select('payment_customer_id')
      .eq('user_id', userId);

    if (userError) {
      throw new Error(`User not found: ${userError.message}`);
    }

    if (userData.length === 0) {
      throw new Error('Stripe customer ID not found for this user.');
    }

    // Initialize an array to hold all invoices for the user
    let allInvoices = [];
    console.log(userData);
    

    // Loop through each user's payment record to fetch invoices
    for (const user of userData) {
      const stripeCustomerId = user.payment_customer_id;

      // Fetch invoices for the Stripe customer
      let invoices;
      try {
        invoices = await stripe.invoices.list({
          customer: stripeCustomerId,
        });
        console.log("In",invoices);
        
      } catch (error) {
        console.error(`Error fetching invoices for customer ${stripeCustomerId}:`, error.message);
        throw new Error(`Failed to fetch invoices for customer ${stripeCustomerId}`);
      }

      // Format the invoice data to return
      const formattedInvoices = invoices.data.map(invoice => ({
        invoiceId: invoice.id,
        amountDue: invoice.amount_due / 100, // Convert from cents to dollars/euros
        amountPaid: invoice.amount_paid / 100,
        currency: invoice.currency,
        invoiceDate: new Date(invoice.created * 1000).toISOString(), // Stripe stores timestamps in seconds
        status: invoice.status,
        hostedInvoiceUrl: invoice.hosted_invoice_url, // Link to view the invoice
        pdfUrl: invoice.invoice_pdf, // PDF of the invoice
      }));

      // Add the formatted invoices to the allInvoices array
      allInvoices = allInvoices.concat(formattedInvoices);
    }
    console.log("ALl", allInvoices);
    

    // Respond with the formatted invoice data
    res.status(200).json({ invoices: allInvoices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}
export default BillingController;