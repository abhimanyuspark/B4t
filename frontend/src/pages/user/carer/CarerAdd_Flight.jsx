import { useDispatch, useSelector } from "react-redux";
import validation from "../../../utils/validation";
import { useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { createAvailability } from "../../../redux/features/carerAvailabilitySlice";

const initialForm = {
  origin: "",
  destination: "",
  flightNumber: "",
  availableDate: "",
};

const CarerAdd_Flight = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState({});
  const { loading } = useSelector((state) => state.carerAvailability);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validation(form);

    if (Object.keys(validationErrors).length > 0) {
      setFormError(validationErrors);
      return;
    }

    toast.promise(
      dispatch(createAvailability(form)).unwrap(),
      {
        loading: "Loading...",
        success: () => {
          setForm(initialForm);
          setFormError({});

          return "Booking Successful";
        },
        error: (err) => err,
      },
      {
        position: "top-center",
      },
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Input
        type="text"
        value={form.origin}
        name="origin"
        label="From"
        placeholder="From"
        error={formError?.origin}
        onChange={handleChange}
      />
      <Input
        type="text"
        value={form.destination}
        label="To"
        name="destination"
        error={formError?.destination}
        placeholder="To"
        onChange={handleChange}
      />
      <Input
        error={formError?.availableDate}
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={form.availableDate}
        label="Date"
        name="availableDate"
        onChange={handleChange}
      />
      <Input
        type="text"
        value={form.flightNumber}
        error={formError?.flightNumber}
        label="Flight number"
        name="flightNumber"
        placeholder="AA2002"
        onChange={handleChange}
      />

      <Button
        loading={loading}
        disabled={loading}
        type="submit"
        className="sm:col-span-2"
      >
        {t("common.save")}
      </Button>
    </form>
  );
};

export default CarerAdd_Flight;
