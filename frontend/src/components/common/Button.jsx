import Loading from "./Loading";

const Button = ({
  children,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`w-full bg-green-600 text-white p-2 flex items-center justify-center gap-2 rounded hover:bg-green-700 transition disabled:bg-white disabled:text-green-600 disabled:font-bold disabled:border-2 disabled:border-green-700 ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loading size="small" />}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
