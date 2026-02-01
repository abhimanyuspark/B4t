import { useState } from "react";

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  error = "",
  label = "",
  text = (v) => v,
  className = "w-48",
  placeholder = "Select Languages...",
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (opt) => {
    const o = text(opt);

    if (value.includes(o)) {
      onChange(value.filter((v) => text(v) !== o));
    } else {
      onChange([...value, o]);
    }
  };

  return (
    <div
      className={`relative flex gap-2 flex-col ${className}`}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <label className="text-base font-medium text-gray-700">{label}</label>

      <div
        className={`w-full px-3 py-2 border border-gray-300 bg-white rounded-md cursor-pointer ${error ? "ring-2 ring-red-500" : ""}
        ${open ? "ring-2 ring-green-500" : ""}`}
        onClick={() => setOpen((p) => !p)}
        {...props}
      >
        {value.length ? (
          <div className="flex gap-2 overflow-x-auto">
            {value.map((v, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm"
              >
                {text(v)}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>

      {open && (
        <ul className="absolute z-10 bottom-13 w-full bg-white border border-gray-300 rounded-md shadow max-h-60 overflow-auto">
          {options.map((opt, index) => {
            const o = text(opt);
            const selected = value.some((v) => text(v) === o);

            return (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer flex justify-between
                hover:bg-green-100 ${
                  selected ? "bg-green-500 font-medium" : ""
                }`}
                onClick={() => toggleOption(opt)}
              >
                <span>{text(opt)}</span>
                <span>{selected && "✓"}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
