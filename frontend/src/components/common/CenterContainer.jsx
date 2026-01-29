export default function CenterContainer({ children, className = "h-full" }) {
  return (
    <div
      className={`flex items-center justify-center bg-white px-4 shadow rounded ${className}`}
    >
      {children}
    </div>
  );
}
