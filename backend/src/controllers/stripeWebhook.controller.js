import stripe from "../config/stripe.js";
import TravelPlan from "../models/travelPlan.model.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const plan = await TravelPlan.findById(session.metadata.travelPlanId);

    if (plan) {
      plan.paymentStatus = "PAID";
      plan.stripePaymentIntentId = session.payment_intent;
      plan.status = "ACTIVE";

      await plan.save();
      res.json(plan);
    }
  }
};
