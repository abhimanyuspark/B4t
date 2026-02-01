import { useSelector } from "react-redux";
import CareSeekerAdd_Flight from "./careseeker/CareSeekerAdd_Flight";
import CarerAdd_Flight from "./carer/CarerAdd_Flight";
import Container from "../../components/common/Container";
import { useTranslation } from "react-i18next";

const Add_Flight = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("flights.title")}
      </h1>

      {user?.activeMode === "careSeeker" ? (
        <CareSeekerAdd_Flight />
      ) : (
        <CarerAdd_Flight />
      )}
    </Container>
  );
};

export default Add_Flight;
