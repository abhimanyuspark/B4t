import { useState } from "react";
import CareSeekerTravelPlan from "./CareSeekerTravelPlan";
import CareSeekerBookings from "./CareSeekerBookings";

const CareSeekerShowBookings = () => {
  const [active, setActive] = useState(true);
  const onToogle = (tab) => {
    if (tab === "bookings") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex sm:gap-8 gap-2 justify-center items-center px-4">
        <button
          onClick={()=> {onToogle("bookings")}}
          className={`rounded-full px-4 py-2 text-xl ${active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
        >
          Bookings
        </button>

        <button
          className={`rounded-full px-4 py-2 text-xl ${!active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={()=> {onToogle("travelPlans")}}
        >
          Travel Plans
        </button>
      </div>

      {active ? <CareSeekerBookings /> : <CareSeekerTravelPlan />}
    </div>
  );
};

export default CareSeekerShowBookings;
