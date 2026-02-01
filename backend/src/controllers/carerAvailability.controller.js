import CarerAvailability from "../models/carerAvailability.model.js";

export const createAvailability = async (req, res) => {
  const availability = await CarerAvailability.create({
    ...req.body,
    carerId: req.user._id,
  });

  res.status(201).json(availability);
};

export const getMatchingCarers = async (req, res) => {
  const { origin, destination, travelDate, flightNumber } = req.query;

  const query = {
    origin,
    destination,
    availableDate: travelDate,
    status: "ACTIVE",
  };

  if (flightNumber) query.flightNumber = flightNumber;

  const carers = await CarerAvailability.find(query).populate(
    "carerId",
    "name rating",
  );

  res.json(carers);
};
