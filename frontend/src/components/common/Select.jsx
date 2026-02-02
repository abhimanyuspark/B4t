import { useState } from "react";

const Select = ({
  options = [],
  value,
  onChange,
  text = () => {},
  className = "w-48",
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <div
        className={`w-full px-4 py-2 border border-gray-300 bg-white rounded-md focus:border-green-500 
            ${open ? "ring-2 ring-green-500" : ""} cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
        {...props}
      >
        {text(value) || "Select..."}
      </div>

      {open && (
        <ul className="absolute z-10 top-12 py-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((opt, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-green-100 
                ${text(value) === text(opt) ? "bg-green-400" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {text(opt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
