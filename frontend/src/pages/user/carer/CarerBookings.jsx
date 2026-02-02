import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyAvailabilities } from "../../../redux/features/carerAvailabilitySlice";
import Button from "../../../components/common/Button";

const CarerBookings = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.carerAvailability);

  useEffect(() => {
    dispatch(getMyAvailabilities());
  }, [dispatch]);

  return (
    <div className="flex gap-4 flex-col">
      {list.map((item) => (
        <div
          key={item._id}
          className="shadow rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow transition"
        >
          {/* Left info */}
          <div>
            <p className="font-medium text-lg">
              {item.origin} → {item.destination}
            </p>

            <p className="text-sm text-gray-500">
              ✈ Flight: {item.flightNumber || "Any"}
            </p>

            <p className="text-sm text-gray-500">
              📅 {new Date(item.availableDate).toDateString()}
            </p>

            <p className="text-sm text-gray-400">Status: {item.status}</p>
          </div>

          {/* Right action */}
          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
            <p className="text-lg font-semibold">₹{item.price}</p>

            <Button
              onClick={() =>
                navigate(`/travel-plans/${planId}/matches/${item._id}`)
              }
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarerBookings;
