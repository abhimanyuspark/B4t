import { useState } from "react";
import CarerBookings from "./CarerBookings";
import CarerAvailabilities from "./CarerAvailabilities";

const CarerShowBookings = () => {
  const [active, setActive] = useState(true);
  const onToogle = () => {
    setActive(!active);
  };

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex sm:gap-8 gap-2 justify-center items-center px-4">
        <button
          onClick={onToogle}
          className={`rounded-full px-4 py-2 text-xl ${active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
        >
          Booking
        </button>

        <button
          className={`rounded-full px-4 py-2 text-xl ${!active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={onToogle}
        >
          Availability
        </button>
      </div>

      {active ? <CarerBookings /> : <CarerAvailabilities />}
    </div>
  );
};

export default CarerShowBookings;
