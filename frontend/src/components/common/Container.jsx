export default function Container({ children, className = "" }) {
  return (
    <div
      className={`bg-white p-4 sm:p-8 shadow rounded min-h-full ${className}`}
    >
      {children}
    </div>
  );
}
