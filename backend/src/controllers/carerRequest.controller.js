import CarerRequest from "../models/carer_request.model.js";
import Booking from "../models/booking.model.js";

export const applyToBooking = async (req, res) => {
  const request = await CarerRequest.create({
    bookingId: req.body.bookingId,
    carerId: req.user._id,
    proposedFlight: req.body.proposedFlight,
    message: req.body.message,
  });

  res.status(201).json(request);
};

export const acceptCarer = async (req, res) => {
  const request = await CarerRequest.findById(req.params.id);
  const booking = await Booking.findById(request.bookingId);

  if (!booking.careseekerId.equals(req.user._id)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  request.status = "ACCEPTED";
  await request.save();

  await CarerRequest.updateMany(
    { bookingId: booking._id, _id: { $ne: request._id } },
    { status: "REJECTED" },
  );

  booking.selectedCarerId = request.carerId;
  booking.bookingStatus = "CARER_SELECTED";
  await booking.save();

  res.json({ success: true });
};

export const getCarerRequestsForBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (!booking.careseekerId.equals(req.user._id)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const requests = await CarerRequest.find({
    bookingId: booking._id,
  }).populate("carerId", "name rating languages");

  res.json(requests);
};

export const getMyCarerRequests = async (req, res) => {
  const requests = await CarerRequest.find({
    carerId: req.user._id,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "bookingId",
      select: "travel bookingStatus amount",
      populate: {
        path: "careseekerId",
        select: "name",
      },
    });

  res.json(requests);
};
