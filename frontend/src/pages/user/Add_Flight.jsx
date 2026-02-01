import { FaAngleDown, FaAngleUp, FaEdit } from "react-icons/fa";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MultiSelect from "../../components/common/MultiSelect";
import { languages } from "../../utils/initial";
import validation from "../../utils/validation";
import { toast } from "react-hot-toast";
import { createBooking } from "../../redux/features/bookingSlice";
import { useDispatch } from "react-redux";

export default function Flights() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    flightNumber: "",
  });
  const [amount, setAmount] = useState(0);
  const [formError, setFormError] = useState({});
  const [prefrence, setPrefrence] = useState({
    services: null,
    languages: [],
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen((p) => !p);
  const onSave = () => setSave((p) => !p);

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validation({ ...form, ...prefrence });

    if (Object.keys(validationErrors).length > 0) {
      setFormError(validationErrors);
      return;
    }

    toast.promise(
      dispatch(
        createBooking({
          travel: form,
          requirements: prefrence,
          amount: 200,
        }),
      ).unwrap(),
      {
        loading: "Loading...",
        success: () => {
          return "Booking successful";
        },
        error: (err) => err,
      },
      {
        position: "top-center",
      },
    );
  };

  return (
    <Container className="bg-gray-50!">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("flights.title")}
      </h1>

      <form
        onSubmit={onSubmit}
        noValidate
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Input
          type="text"
          name="from"
          label="From"
          placeholder="From"
          error={formError?.from}
          onChange={handleChange}
        />
        <Input
          type="text"
          label="To"
          name="to"
          error={formError?.to}
          placeholder="To"
          onChange={handleChange}
        />
        <Input
          error={formError?.date}
          type="date"
          label="Date"
          name="date"
          onChange={handleChange}
        />
        <Input
          type="text"
          error={formError?.flightNumber}
          label="Flight number"
          name="flightNumber"
          placeholder="AA2002"
          onChange={handleChange}
        />

        {save ? (
          <PrefrenceSaved
            prefrence={prefrence}
            onOpen={onOpen}
            onSave={onSave}
          />
        ) : (
          <Prefrences
            prefrence={prefrence}
            setPrefrence={setPrefrence}
            onOpen={onOpen}
            onSave={onSave}
            open={open}
            error={formError}
            setFormError={setFormError}
          />
        )}

        <Button type="submit" className="sm:col-span-2">
          {t("common.save")}
        </Button>
      </form>
    </Container>
  );
}

const Prefrences = ({
  prefrence,
  setPrefrence,
  onOpen,
  onSave,
  open,
  error,
  setFormError,
}) => {
  const { t } = useTranslation();

  const onGender = (e) => {
    setPrefrence((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
    setFormError((p) => ({ ...p, gender: undefined }));
  };

  return (
    <div
      className={`border border-gray-300 rounded-md col-auto sm:col-span-2 flex flex-col p-1
        ${error?.languages ? "ring-2 ring-red-600" : ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex justify-between items-center w-full hover:bg-gray-100 p-2"
      >
        <span>Preference</span>
        {open ? <FaAngleUp /> : <FaAngleDown />}
      </button>

      {open && (
        <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-2 flex-col text-gray-700">
            <span className="text-base font-medium">Gender</span>
            <div className="flex items-center justify-evenly gap-8 w-full">
              <label
                htmlFor="male"
                className="font-medium flex justify-between w-full cursor-pointer"
              >
                <span>Male</span>
                <input
                  id="male"
                  value="male"
                  name="gender"
                  checked={prefrence.gender === "male"}
                  type="radio"
                  onChange={onGender}
                />
              </label>

              <label
                htmlFor="female"
                className="font-medium flex justify-between w-full cursor-pointer"
              >
                <span>Female</span>
                <input
                  id="female"
                  value="female"
                  checked={prefrence.gender === "female"}
                  name="gender"
                  type="radio"
                  onChange={onGender}
                />
              </label>
            </div>

            {error.gender && (
              <span className="text-red-500 text-sm font-medium">
                {error.gender}
              </span>
            )}
          </div>

          <div>
            <MultiSelect
              label="Languages"
              error={error.languages}
              className="w-full"
              options={languages}
              value={prefrence.languages}
              text={(q) => q.name || q}
              onChange={(l) => {
                setPrefrence((prev) => ({
                  ...prev,
                  languages: l,
                }));
                setFormError((e) => ({ ...e, languages: undefined }));
              }}
            />

            {error?.languages && (
              <p className="text-red-500 text-sm font-medium mt-2">
                {error.languages}
              </p>
            )}
          </div>

          <Button
            type="button"
            className=""
            onClick={() => {
              const validationErrors = validation(prefrence);

              if (Object.keys(validationErrors).length > 0) {
                setFormError((p) => ({
                  ...p,
                  languages: validationErrors.languages,
                  gender: validationErrors.gender,
                }));
                return;
              }

              setFormError((p) => ({ ...p, languages: null, gender: null }));
              onSave();
              onOpen();
            }}
          >
            {t("common.save")}
          </Button>
        </div>
      )}
    </div>
  );
};

const PrefrenceSaved = ({ prefrence, onOpen, onSave }) => {
  return (
    <div className="flex flex-col gap-2 col-auto sm:col-span-2 p-4 rounded-md bg-green-200">
      <div className="flex justify-between items-center">
        <p className="text-xl">Preference</p>
        <p className="cursor-pointer bg-green-400 p-3 rounded-full text-2xl">
          <FaEdit
            onClick={() => {
              onOpen();
              onSave();
            }}
          />
        </p>
      </div>

      <div className="flex gap-2 items-center text-base">
        <span className="font-bold text-base">Gender : </span>
        <span className="first-letter:uppercase">{prefrence.gender}</span>
      </div>

      <ul className="flex gap-2 items-center">
        <li className="font-bold text-base">Languages : </li>
        {prefrence.languages.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};
