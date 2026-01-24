import React, { useState } from "react";
import Input from "./Input";

const PassInput = ({ value, onChange, error, ...props }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <Input
        type={open ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        error={error}
        {...props}
      />
      <span
        className="absolute right-3 top-9 cursor-pointer select-none text-gray-600"
        onClick={toggle}
      >
        {open ? "🙈" : "👁️"}
      </span>
    </div>
  );
};

export default PassInput;
