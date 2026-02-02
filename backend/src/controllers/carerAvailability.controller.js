import CarerAvailability from "../models/carerAvailability.model.js";
import TravelPlan from "../models/travelPlan.model.js";

export const createAvailability = async (req, res) => {
  const availability = await CarerAvailability.create({
    ...req.body,
    carerId: req.user._id,
  });

  res.status(201).json(availability);
};

export const getMatchingCarers = async (req, res) => {
  const { planId } = req.params;

  const plan = await TravelPlan.findById(planId);
  if (!plan) {
    return res.status(400).json({ message: "Plan id missing" });
  }

  const query = {
    origin: plan.origin,
    destination: plan.destination,
    availableDate: plan.travelDate,
    status: "ACTIVE",
  };

  if (plan.flightNumber) query.flightNumber = plan.flightNumber;

  const carers = await CarerAvailability.find(query).populate(
    "carerId",
    "name email profilePicture",
  );
  res.json(carers);
};

export const getMyAvailabilities = async (req, res) => {
  const list = await CarerAvailability.find({
    carerId: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(list);
};
