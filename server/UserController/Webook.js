const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const nodemailer = require("../UserController/sendmail");
const Order = require("../config/schema");

exports.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log("❌ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle events
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      console.log("✅ Payment Successful!");
      console.log("Session ID:", session.id);
      console.log("Customer Email:", session.customer_email);
      console.log(" transection id:", session.transection_id)

          await Order.create({
          sessionId: session.id,
          email: session.customer_email,
    amount: session.amount_total / 100,
    status: "paid",
  });

  console.log("💾 Order saved to DB");

      await  nodemailer(
        process.env.EMAIL_SEND,
        "💰 New Payment Received",
        `Payment Successful!
           Amount: ₹${session.amount_total / 100}
           Customer Email: ${session.customer_email}
           Session ID: ${session.id}`,
      );
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Payment Failed");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
 };
 

