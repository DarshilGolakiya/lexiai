import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaHistory,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 space-y-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 flex flex-col justify-between`}
      >
        <div> <Link
              to="/"
              className="text-3xl font-bold"
            >
              
              <h1>𝕃𝕖𝕩𝕚 ᗩI</h1>
            </Link>
          
          <nav className="flex flex-col space-y-4 mt-6">
            <Link
              to="/home"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 text-xl rounded"
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/topic"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 text-xl rounded"
            >
              <FaBook />
              <span>Topic</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 text-xl rounded"
            >
              <FaHistory />
              <span>History</span>
            </Link>
            <Link
              to="/billing"
              className="flex items-center space-x-2 p-3 hover:bg-gray-700 text-xl rounded"
            >
              <FaMoneyBill />
              <span>Billing</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-3 bg-red-600 hover:bg-red-700 text-xl rounded w-full text-left"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded md:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default Sidebar;
