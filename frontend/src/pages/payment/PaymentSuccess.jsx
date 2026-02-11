import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../redux/services/api";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await api.post("/travel-plans/verify-payment", {
          session_id: id,
        });

        toast.success("Payment Successful ✅");

        // setTimeout(() => {
        navigate("/bookings", { replace: true });
        // }, 1500);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Payment verification failed",
        );
        navigate("/payment-cancel", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      verifyPayment();
    }
  }, [id, navigate]);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-xl font-semibold border border-gray-200 rounded shadow-2xl p-8">
        {loading ? "Verifying Payment..." : "Redirecting..."}
      </h1>
    </div>
  );
};

export default PaymentSuccess;
