import Container from "../../components/common/Container";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CarerShowBookings from "./carer/CarerShowBookings";
import CareSeekerShowBookings from "./careseeker/CareSeekerShowBookings";

export default function Bookings() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("bookings.title")} 📑
      </h1>

      {user?.activeMode === "careSeeker" ? (
        <CareSeekerShowBookings />
      ) : (
        <CarerShowBookings />
      )}
    </Container>
  );
}
