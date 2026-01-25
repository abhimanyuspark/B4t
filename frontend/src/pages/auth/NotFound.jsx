import { Link } from "react-router";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
      <svg
        className="w-20 h-20 text-green-500 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 64 64"
      >
        <circle cx="32" cy="32" r="30" strokeWidth="4" />
        <path
          d="M24 24h16M24 32h16M24 40h8"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;
