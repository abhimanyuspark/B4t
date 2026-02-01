import Booking from "../models/Booking.js";
import TravelPlan from "../models/TravelPlan.js";
import CarerAvailability from "../models/CarerAvailability.js";
import User from "../models/User.js";

export const createBooking = async (req, res) => {
  const { travelPlanId, carerAvailabilityId } = req.body;

  const plan = await TravelPlan.findById(travelPlanId);
  if (!plan || plan.paymentStatus !== "PAID")
    return res.status(400).json({ message: "Plan not paid or invalid" });

  const availability = await CarerAvailability.findById(carerAvailabilityId);
  if (!availability || availability.status !== "ACTIVE")
    return res.status(400).json({ message: "Carer unavailable" });

  const booking = await Booking.create({
    travelPlanId,
    carerAvailabilityId,
    careseekerId: plan.careseekerId,
    carerId: availability.carerId,
    amount: availability.price,
  });

  res.status(201).json(booking);
};

export const acceptBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  if (!booking.carerId.equals(req.user._id))
    return res.status(403).json({ message: "Unauthorized" });

  booking.status = "CONFIRMED";
  await booking.save();

  await CarerAvailability.findByIdAndUpdate(booking.carerAvailabilityId, {
    status: "BOOKED",
  });

  await TravelPlan.findByIdAndUpdate(booking.travelPlanId, {
    status: "MATCHED",
  });

  res.json(booking);
};

export const completeBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  booking.status = "COMPLETED";
  await booking.save();

  const carer = await User.findById(booking.carerId);
  carer.wallet.balance += booking.amount;
  await carer.save();

  await TravelPlan.findByIdAndUpdate(booking.travelPlanId, {
    status: "COMPLETED",
  });

  res.json({ success: true });
};
