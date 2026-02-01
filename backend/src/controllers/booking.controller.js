import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    careseekerId: req.user._id,
    travel: req.body.travel,
    requirements: req.body.requirements,
    amount: req.body.amount,
  });

  res.status(201).json(booking);
};

export const markPaymentDone = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  booking.paymentStatus = "PAID";
  booking.bookingStatus = "OPEN";

  await booking.save();
  res.json(booking);
};

export const completeBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  booking.bookingStatus = "COMPLETED";
  await booking.save();

  const carer = await User.findById(booking.selectedCarerId);
  carer.wallet.balance += booking.amount;
  await carer.save();

  res.json({ success: true });
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    careseekerId: req.user._id,
  })
    .sort({ createdAt: -1 })
    .populate("selectedCarerId", "name email");

  res.json(bookings);
};

export const getOpenBookings = async (req, res) => {
  const bookings = await Booking.find({
    paymentStatus: "PAID",
    bookingStatus: "OPEN",
  })
    .sort({ createdAt: -1 })
    .populate("careseekerId", "name rating");

  res.json(bookings);
};

export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("careseekerId", "name email")
    .populate("selectedCarerId", "name email");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const isCareseeker = booking.careseekerId._id.equals(req.user._id);
  const isCarer =
    booking.selectedCarerId && booking.selectedCarerId._id.equals(req.user._id);

  if (!isCareseeker && !isCarer) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.json(booking);
};
