import { GoogleLogin } from "@react-oauth/google";
import { googleLoginUser } from "../../redux/features/authSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const GoogleAuthButton = () => {
  const { location } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    toast.promise(
      dispatch(googleLoginUser({ idToken, location })).unwrap(),
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
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google Login Failed")}
      useOneTap
      logo_alignment="center"
    />
  );
};

export default GoogleAuthButton;
