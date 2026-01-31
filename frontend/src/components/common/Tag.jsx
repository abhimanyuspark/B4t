const Tag = ({ children, className = "bg-green-200", ...props }) => {
  return (
    <span
      {...props}
      className={`py-1 px-2 inline-block w-auto rounded-full text-sm text-gray-700 first-letter:uppercase ${className}`}
    >
      {children}
    </span>
  );
};

export default Tag;
