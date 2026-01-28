import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import validation from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../redux/features/authSlice";
import PassInput from "../../components/common/PassInput";
import { toast } from "react-hot-toast";
import GoogleAuthButton from "../../components/@comp/GoogleAuthButton";

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

    toast.promise(
      dispatch(loginUser(form)).unwrap(),
      {
        loading: "Loading...",
        success: () => {
          navigate("/", { replace: true });
          return "Login successful";
        },
        error: (err) => err,
      },
      {
        position: "top-center",
      },
    );
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form className="flex gap-2 flex-col" onSubmit={handleSubmit} noValidate>
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

        <Button type="submit" loading={loading} disabled={loading}>
          Login
        </Button>

        <br />
        <div className="flex items-center gap-4">
          <hr className="flex-1 border border-gray-200" />
          <span className="text-gray-500">or</span>
          <hr className="flex-1 border border-gray-200" />
        </div>
        <br />

        <GoogleAuthButton />
      </form>

      <p className="text-base text-gray-700 mt-4">
        Don't have an account ?
        <Link to="/register" className="text-green-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
