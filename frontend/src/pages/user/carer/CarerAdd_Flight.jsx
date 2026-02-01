import { useDispatch, useSelector } from "react-redux";
import validation from "../../../utils/validation";
import { useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { applyToBooking } from "../../../redux/features/carerRequestSlice";

const initialForm = {
  from: "",
  to: "",
  date: "",
  flightNumber: "",
};

const CarerAdd_Flight = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.bookings);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validation({ ...form, ...prefrence });

    if (Object.keys(validationErrors).length > 0) {
      setFormError(validationErrors);
      return;
    }

    toast.promise(
      dispatch(
        applyToBooking({
          travel: form,
        }),
      ).unwrap(),
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
        value={form.from}
        name="from"
        label="From"
        placeholder="From"
        error={formError?.from}
        onChange={handleChange}
      />
      <Input
        type="text"
        value={form.to}
        label="To"
        name="to"
        error={formError?.to}
        placeholder="To"
        onChange={handleChange}
      />
      <Input
        error={formError?.date}
        type="date"
        value={form.date}
        label="Date"
        name="date"
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
