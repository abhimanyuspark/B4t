import TravelPlan from "../models/travelPlan.model.js";
import stripe from "../config/stripe.js";

const PLATFORM_PRICE = 1000;
const COMMISSION_PERCENT = 20;

/* ===============================
   1️⃣ CREATE PLAN + STRIPE SESSION
================================= */
export const createTravelPlan = async (req, res) => {
  try {
    const commission = (PLATFORM_PRICE * COMMISSION_PERCENT) / 100;

    const plan = await TravelPlan.create({
      ...req.body,
      careseekerId: req.user._id,
      totalPaid: PLATFORM_PRICE,
      platformCommission: commission,
      carerPayout: PLATFORM_PRICE - commission,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Travel With Buddy Service",
            },
            unit_amount: PLATFORM_PRICE * 100, // Stripe uses paise
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        travelPlanId: plan._id.toString(),
      },
    });

    plan.stripeSessionId = session.id;
    await plan.save();

    res.status(201).json({
      success: true,
      url: session.url, // IMPORTANT
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   2️⃣ VERIFY PAYMENT (NO WEBHOOK)
================================= */
export const verifyTravelPlanPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ message: "Session ID required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const travelPlanId = session.metadata.travelPlanId;

    const plan = await TravelPlan.findById(travelPlanId);

    if (!plan) {
      return res.status(404).json({ message: "Travel plan not found" });
    }

    plan.paymentStatus = "PAID";
    await plan.save();

    res.json({
      success: true,
      message: "Payment verified",
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTravelPlans = async (req, res) => {
  try {
    const plans = await TravelPlan.find({ careseekerId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
