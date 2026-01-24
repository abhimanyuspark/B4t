import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import validation from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../redux/features/authSlice";
import PassInput from "../../components/common/PassInput";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PassInput
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <br />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <br />
        <Button type="submit" loading={loading} disabled={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
