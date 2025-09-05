// src/components/Navbar.jsx
import React, { useContext, useRef, useEffect, useState } from "react";
import logoilu from "../images/DocFinder.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const navLinkClass = "relative text-gray-600 font-medium after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoilu} alt="DocFinder Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-gray-800">DocFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-grow gap-8">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/hospitals" className={navLinkClass}>Hospital</Link>
          <Link to="/book-ambulance" className={navLinkClass}>Ambulance</Link>
          <Link to="/contact" className={navLinkClass}>Contact</Link>
          <Link to="/about" className={navLinkClass}>About</Link>
        </nav>

        {/* Auth Section & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block" ref={dropdownRef}>
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-blue-600 text-3xl hover:opacity-80 transition-opacity" aria-label="Profile">
                  <FaUserCircle />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in-down">
                    <Link
                      to={user.role === 'hospital' ? '/hospital-home' : '/dashboard'}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 text-2xl">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 animate-fade-in-down">
          <nav className="flex flex-col items-center gap-4">
            <Link to="/" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/hospitals" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Hospital</Link>
            <Link to="/book-ambulance" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Ambulance</Link>
            <Link to="/contact" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/about" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>

            <div className="mt-4 w-full px-4">
              {user ? (
                <div className="text-center">
                   <Link
                      to={user.role === 'hospital' ? '/hospital-home' : '/dashboard'}
                      className="block w-full py-2 mb-2 text-gray-700 bg-gray-100 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="block w-full py-2 text-red-600 bg-red-50 rounded-lg">Logout</button>
                </div>
              ) : (
                 <Link
                  to="/login"
                  className="block w-full text-center py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;