import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logoilu from "../images/DocFinder.png"; // Assuming you have the logo image

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Column 1: Logo, About & Socials */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoilu} alt="DocFinder Logo" className="w-10 h-10 bg-white p-1 rounded-md" />
              <span className="text-2xl font-bold">DocFinder</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-xs">
              Your reliable partner in finding and booking medical services quickly and efficiently.
            </p>
            <ul className="mt-6 flex gap-6">
              <li><a href="#" rel="noreferrer" target="_blank" className="text-gray-400 hover:text-white transition"><FaFacebook size={24} /></a></li>
              <li><a href="#" rel="noreferrer" target="_blank" className="text-gray-400 hover:text-white transition"><FaInstagram size={24} /></a></li>
              <li><a href="#" rel="noreferrer" target="_blank" className="text-gray-400 hover:text-white transition"><FaLinkedin size={24} /></a></li>
              <li><a href="#" rel="noreferrer" target="_blank" className="text-gray-400 hover:text-white transition"><FaGithub size={24} /></a></li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p className="font-semibold text-white">Quick Links</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="/hospitals" className="text-gray-400 hover:text-white transition">Hospitals</Link></li>
              <li><Link to="/book-ambulance" className="text-gray-400 hover:text-white transition">Ambulance</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <p className="font-semibold text-white">Support</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <p className="font-semibold text-white">Contact Us</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">ITER, Jagamara, Khandagiri, Bhubaneswar, Odisha-751030</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400" />
                <a href="mailto:docfinder@outlook.com" className="text-gray-400 hover:text-white transition">docfinder@outlook.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-indigo-400" />
                <a href="tel:+917327050111" className="text-gray-400 hover:text-white transition">+91-7327050111</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DocFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;