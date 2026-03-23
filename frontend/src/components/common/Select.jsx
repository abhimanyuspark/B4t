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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex]);
          setOpen(false);
          setHighlightedIndex(-1);
        }
        break;
      case "Escape":
        setOpen(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onBlur={() => {
        setOpen(false);
        setHighlightedIndex(-1);
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
                ${
                  highlightedIndex === index
                    ? "bg-blue-400"
                    : text(value) === text(opt)
                    ? "bg-green-400"
                    : ""
                }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
                setHighlightedIndex(-1);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
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
