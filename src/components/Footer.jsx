import React from 'react'
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="footer bg-orange-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-6 ">
        
        {/* Image Section */}
        <div className='image relative w-full h-full lg:col-span-2'>
          <img 
            src='src/images/foot.png' 
            alt='image' 
            className='h-full w-full object-cover'
          />
        </div>

        <div className='px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>

                {/* Contact Details */}
                <div>
                    <h3 className='text-xl font-semibold text-orange-900'>Contact Us</h3>
                    <ul className='mt-4 space-y-3 text-gray-700'>
                        <li className='flex items-center gap-3'>
                            <FaLocationDot className='text-orange-400 text-lg' />
                            <span>ITER, Jagamara, Khandagiri, Bhubaneswar, Odisha-751030</span>
                        </li>
                        <li className='flex items-center gap-3'>
                            <FaPhone className='text-orange-400 text-lg' />
                            <span>+91-7327050111</span>
                        </li>
                        <li className='flex items-center gap-3'>
                            <FaEnvelope className='text-orange-400 text-lg' />
                            <span>docfinder@outlook.com</span>
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className='text-xl font-semibold text-orange-900'>Follow Us</h3>
                    <ul className='mt-4 flex gap-6 text-2xl'>
                        <li>
                            <a href='#' rel="noreferrer" target='_blank' className='text-gray-700 transition hover:opacity-75'>
                                <FaFacebook />
                                <span className='sr-only'>Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' rel="noreferrer" target='_blank' className='text-gray-700 transition hover:opacity-75'>
                                <FaLinkedin />
                                <span className='sr-only'>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' rel="noreferrer" target='_blank' className='text-gray-700 transition hover:opacity-75'>
                                <FaInstagram />
                                <span className='sr-only'>Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' rel="noreferrer" target='_blank' className='text-gray-700 transition hover:opacity-75'>
                                <FaGithub />
                                <span className='sr-only'>GitHub</span>
                            </a>
                        </li>
                    </ul>
                </div>

                 {/* Footer Bottom Section */}
        <div className="mt-12 border-t-2 border-gray-800 pt-12 lg:col-span-5">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75"> Cookies </a>
              </li>
            </ul>
            <p className="mt-8 text-xs text-gray-500 sm:mt-0">
              &copy; 2025. DocFinder. All rights reserved.
            </p>
        </div>
    </div>
    </div>

       
 </div>
    </footer>
  )
}

export default Footer;