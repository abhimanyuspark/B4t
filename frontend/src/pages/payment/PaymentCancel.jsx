import { useEffect } from "react";
import { toast } from "react-hot-toast";

const PaymentCancel = () => {
  useEffect(() => {
    toast.error("Payment Cancelled");
  }, []);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-2xl mt-20 font-bold text-red-600 p-8 border border-gray-300 rounded bg-white">Payment Cancelled</h1>
    </div>
  );
};

export default PaymentCancel;
