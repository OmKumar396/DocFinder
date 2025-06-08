import React, { useState } from 'react';
import { FaUser, FaClipboardList } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Animation hooks
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: illuRef, inView: illuInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit (ready for backend integration)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Replace this with your backend API call
    // Example:
    // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
    setMessage(`Thank you, ${formData.name}. We'll contact you shortly!`);
    setMessageType('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', problem: '' });
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 font-inter overflow-hidden">
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row bg-orange-50 rounded-3xl shadow-2xl overflow-hidden">

        {/* Form Section */}
        <div
          ref={formRef}
          className={`w-full md:w-1/2 p-8 md:p-12 transition-all duration-1000 ease-out ${
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8">
            <svg
              className="mx-auto h-16 w-16 text-red-600 mb-4 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <h2 className="text-4xl font-extrabold text-red-700 mb-4 leading-tight">Need Emergency Assistance?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
              Our emergency support team is available 24/7 to help you find critical care beds.
            </p>
          </div>

          {message && (
            <div
              className={`p-4 mb-6 rounded-xl text-center font-semibold ${
                messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              } shadow-md transition-opacity duration-500 opacity-100`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-semibold text-gray-800 mb-2">Your Name</label>
              <div className="flex items-center w-full relative h-12 border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#ff8c00] focus-within:border-[#ff8c00] transition duration-200">
                <div className="icon__wrapper w-12 absolute flex justify-center items-center">
                  <span className="text-xl opacity-80 text-gray-500"><FaUser /></span>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-full pl-12 pr-3 border-none rounded-xl bg-gray-50 outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-2">Your Email</label>
              <div className="flex items-center w-full relative h-12 border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#ff8c00] focus-within:border-[#ff8c00] transition duration-200">
                <div className="icon__wrapper w-12 absolute flex justify-center items-center">
                  <span className="text-xl opacity-80 text-gray-500"><MdOutlineMailOutline /></span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-full pl-12 pr-3 border-none rounded-xl bg-gray-50 outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="problem" className="block text-base font-semibold text-gray-800 mb-2">Describe Your Problem</label>
              <div className="flex items-start w-full relative border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#ff8c00] focus-within:border-[#ff8c00] transition duration-200">
                <div className="icon__wrapper w-12 pt-3 absolute flex justify-center items-center self-start">
                  <span className="text-xl opacity-80 text-gray-500"><FaClipboardList /></span>
                </div>
                <textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full h-full pl-12 pr-3 py-3 border-none rounded-xl bg-gray-50 outline-none resize-y"
                  placeholder="Please describe your emergency or problem in detail..."
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-400 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-bold text-lg"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Illustration Section */}
        <div
          ref={illuRef}
          className={`w-full md:w-1/2 bg-gradient-to-tr from-[#febd76] to-[#ff8c00] flex flex-col justify-center items-center p-8 md:p-12 text-center text-white transition-all duration-1000 ease-out delay-200 ${
            illuInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <img
            src="src/images/contact.png"
            alt="Medical Illustration"
            className="w-cover h-120"
          />
          <h2 className="text-3xl font-bold mb-2">Connect with Our Emergency Team</h2>
          <p className="text-lg mb-8 opacity-90">We are here to provide immediate assistance for critical care needs, 24/7.</p>
          <div className='dots flex justify-center items-center gap-x-3'>
            <div className='dot w-2.5 h-2.5 bg-white rounded-full block opacity-70'></div>
            <div className='dot w-2.5 h-2.5 bg-white rounded-full block opacity-70'></div>
            <div className='dot w-2.5 h-2.5 bg-white rounded-full block opacity-70'></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;