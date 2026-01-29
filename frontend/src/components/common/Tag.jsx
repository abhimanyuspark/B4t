const Tag = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="py-1 px-2 inline-block w-auto rounded-full text-sm bg-green-200 text-gray-700"
    >
      {children}
    </span>
  );
};

export default Tag;
