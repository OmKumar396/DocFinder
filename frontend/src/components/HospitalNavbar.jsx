// src/components/HospitalNavbar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import logoilu from "../images/DocFinder.png";

const HospitalNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-orange-50 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/hospital-home" className="flex items-center gap-2">
          <img src={logoilu} alt="Hospital Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
          <span className="text-xl font-semibold text-gray-800">DocFinder - Hospital</span>
        </Link>

        <nav className="hidden md:flex items-center justify-center flex-grow space-x-4 lg:space-x-6">
          <Link to="/hospital-home" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Home</Link>
          <Link to="/ambulance-registration" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Ambulance</Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Contact</Link>
          <Link to="/about" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">About</Link>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={handleProfileClick} className="text-[#ff8c00] text-3xl" aria-label="Profile">
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <Link to="/hospital/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HospitalNavbar;
