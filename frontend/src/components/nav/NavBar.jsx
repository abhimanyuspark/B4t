import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 p-4 right-0 mx-auto px-4 sm:px-6 lg:px-8 z-50">
      <NavContent />
    </nav>
  );
};

const NavContent = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-between">
      <div className="shrink-0">
        <h1 className="text-xl font-bold">MyApp</h1>
      </div>
      <div>
        {isAuthenticated ? (
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-gray-800 hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-800 hover:text-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-800 hover:text-gray-600">
                Contact
              </a>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link to="/login" className="text-gray-800 hover:text-gray-600">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
