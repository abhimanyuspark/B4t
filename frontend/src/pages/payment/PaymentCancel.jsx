import { useEffect } from "react";
import { toast } from "react-hot-toast";

const PaymentCancel = () => {
  useEffect(() => {
    toast.error("Payment Cancelled");
  }, []);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
    </div>
  );
};

export default PaymentCancel;
