import Booking from "../models/booking.model.js";
import TravelPlan from "../models/travelPlan.model.js";
import CarerAvailability from "../models/carerAvailability.model.js";
import User from "../models/user.model.js";
import { io } from "../config/socket.js";

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
    totalPaid: plan.totalPaid,
    platformCommission: plan.platformCommission,
    carerPayout: plan.carerPayout,
  });

  availability.status = "BOOKED";
  await availability.save();

  io.emit("updateAvailabilityStatus", {
    id: carerAvailabilityId,
    status: "BOOKED",
  });

  plan.isCarerSelected = true;
  await plan.save();

  res.status(201).json(booking);
};

export const acceptBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  if (!booking.carerId.equals(req.user._id))
    return res.status(403).json({ message: "Unauthorized" });

  booking.status = "CONFIRMED";
  await booking.save();

  io.emit("updateBookingStatus", {
    id: booking._id,
    status: "CONFIRMED",
  });

  await TravelPlan.findByIdAndUpdate(booking.travelPlanId, {
    status: "MATCHED",
  });

  io.emit("updateTravelPlanStatus", {
    id: booking.travelPlanId,
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
  carer.wallet.balance += booking.carerPayout;
  await carer.save();

  await TravelPlan.findByIdAndUpdate(booking.travelPlanId, {
    status: "COMPLETED",
  });

  res.json({ success: true });
};

export const getMyBookings = async (req, res) => {
  const query =
    req.user.activeMode === "careSeeker"
      ? { careseekerId: req.user._id }
      : { carerId: req.user._id };

  const bookings = await Booking.find(query)
    .populate("travelPlanId")
    .populate("carerAvailabilityId")
    .populate("careseekerId")
    .populate("carerId")
    .sort({ createdAt: -1 });

  res.json(bookings);
};
