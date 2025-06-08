import React from "react";
import logoilu from "../images/DocFinder.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-orange-50 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoilu} alt="DocFinder Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
          <span className="text-xl font-semibold text-gray-800">DocFinder</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center justify-center flex-grow space-x-4 lg:space-x-6">
          <Link to="/" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Home</Link>
          <Link to="/hospitals" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Hospital</Link>
          <Link to="/ambulance" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Ambulance</Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">Contact</Link>
          <Link to="/about" className="text-gray-700 hover:text-[#ff8c00] font-medium transition duration-200">About</Link> {/* Added About Link */}
        </nav>

        {/* Glowing Login Button */}
        <Link
          to="/login"
          className="relative inline-block px-4 py-2 text-sm font-medium text-white bg-[#ff8c00] rounded-md shadow hover:bg-orange-600 transition duration-200 overflow-hidden"
        >
          <span className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 bg-[radial-gradient(circle,white,transparent_10%)]"></span>
          <span className="relative z-10">Login</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
