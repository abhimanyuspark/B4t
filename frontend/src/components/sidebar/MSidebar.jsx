import { useState } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const MSidebar = () => {
  const [menu, setMenu] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return;
  }

  return (
    <div className="">
      <button className="text-xl text-gray-600 sm:hidden block bg-gray-100 hover:bg-gray-200 p-2 rounded">
        {pathname === "/" ? (
          <FaBars
            onClick={() => {
              setMenu(!menu);
            }}
          />
        ) : (
          <FaArrowLeft
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
      </button>

      <div
        className="fixed z-50 top-0 w-screen transformed transition-all duration-500 ease-in-out"
        style={{
          left: menu ? "0" : "-100%",
        }}
        onClick={() => setMenu(false)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="shadow-2xl h-screen bg-white overflow-auto p-3 w-60"
        >
          <Sidebar
            onClose={() => {
              setMenu(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MSidebar;
