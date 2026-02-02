import TravelPlan from "../models/travelPlan.model.js";

export const createTravelPlan = async (req, res) => {
  const plan = await TravelPlan.create({
    ...req.body,
    careseekerId: req.user._id,
  });

  res.status(201).json(plan);
};

export const markTravelPlanPaid = async (req, res) => {
  const plan = await TravelPlan.findById(req.params.id);

  if (!plan) return res.status(404).json({ message: "Not found" });
  if (!plan.careseekerId.equals(req.user._id))
    return res.status(403).json({ message: "Unauthorized" });

  plan.paymentStatus = "PAID";
  await plan.save();

  res.json(plan);
};

export const getMyTravelPlans = async (req, res) => {
  const plans = await TravelPlan.find({
    careseekerId: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(plans);
};
