import React, { useState, useEffect } from "react";
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
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
    }
  }, []);

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
        <div>
          <Link
            to="/"
            className="text-4xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <h1>LexiAI</h1>
          </Link>
          <div><hr className="w-full border-gray-300" /></div>
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

        {/* User Email and Logout Button */}
        <div className="flex flex-col items-start">
          <button
            onClick={() => setShowLogout(!showLogout)}
            className="flex items-center space-x-2 p-3 hover:bg-gray-700 text-xl rounded w-full text-left"
          >
            <span>{email}</span>
          </button>
          {showLogout && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-3 text-black bg-white hover:bg-slate-200 text-xl rounded w-full text-left mt-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>
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
