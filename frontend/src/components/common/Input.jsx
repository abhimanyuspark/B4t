const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  className = "",
  error = "",
  ...props
}) => {
  return (
    <div className="flex gap-1 flex-col">
      <label className="text-gray-700 font-medium first-letter:uppercase">
        {name}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition ${className}`}
        {...props}
      />

      <span className="text-red-500 font-medium text-sm">{error && error}</span>
    </div>
  );
};

export default Input;
