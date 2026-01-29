import { FaPlaneDeparture, FaPlaneArrival, FaClock } from "react-icons/fa";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";

const flights = [
  {
    id: 1,
    from: "Delhi",
    to: "Mumbai",
    airline: "IndiGo",
    depart: "06:30",
    arrive: "08:40",
    price: "₹4,999",
  },
  {
    id: 2,
    from: "Bangalore",
    to: "Goa",
    airline: "Vistara",
    depart: "09:15",
    arrive: "10:45",
    price: "₹6,299",
  },
];

export default function Flights() {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {t("flights.title")} ✈️
        </h1>

        {/* Search Box */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="From"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="To"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button>{t("common.search")}</Button>
        </div>

        {/* Flight Cards */}
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">{t("flights.from")}</p>
                  <p className="font-semibold flex items-center gap-2">
                    <FaPlaneDeparture /> {flight.from}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">{t("flights.to")}</p>
                  <p className="font-semibold flex items-center gap-2">
                    <FaPlaneArrival /> {flight.to}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">{t("flights.date")}</p>
                  <p className="font-semibold flex items-center gap-2">
                    <FaClock /> {flight.depart} - {flight.arrive}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 md:mt-0 md:gap-6">
                <p className="font-bold text-lg text-blue-600">
                  {flight.price}
                </p>
                <Button>{t("flights.book")}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
