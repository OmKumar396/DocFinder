import React, { useState } from 'react';
import { FaUser, FaClipboardList } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoCallOutline, IoLocationOutline, IoChatbubbleEllipsesOutline, IoMailOutline } from 'react-icons/io5'; // ✅ Corrected Line
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Animation hooks
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 300 });
  const { ref: optionsRef, inView: optionsInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 300 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://doc-finder-ten.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Your message has been sent successfully!');
        setMessageType('success');
        setFormData({ name: '', email: '', problem: '' });
      } else {
        setMessage(result.message || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <div className="max-w-7xl mx-auto py-16 px-4">

        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help. Whether you have a question, a problem, or feedback, our team is ready to assist you.
          </p>
        </div>

        {/* --- Form Section --- */}
        <div 
          ref={formRef} 
          className={`transition-all duration-1000 ease-out ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            {message && (
              <div className={`p-4 mb-6 rounded-lg text-center font-semibold ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" />
              </div>
              {/* Email Input */}
              <div className="relative">
                <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Email" />
              </div>
              {/* Problem Textarea */}
              <div className="relative">
                <FaClipboardList className="absolute left-4 top-4 text-gray-400" />
                <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="5" className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Describe your problem or question..."></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-blue-600 transition duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>

        {/* --- Alternative Contact Options --- */}
        <div 
          ref={optionsRef} 
          className={`text-center mt-20 transition-all duration-1000 ease-out ${optionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <h3 className="text-3xl font-bold text-gray-800">More Ways to Connect</h3>
            <p className="mt-2 text-lg text-gray-600">Prefer to reach us directly? Here's how.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto">
                {/* Email Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-4">
                        <IoMailOutline className="text-3xl text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h4>
                    <p className="text-gray-600">For general inquiries and support.</p>
                    <a href="mailto:docfinder@outlook.com" className="font-semibold text-indigo-600 hover:text-indigo-800 mt-2 inline-block">docfinder@outlook.com</a>
                </div>
                {/* Phone Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-4">
                        <IoCallOutline className="text-3xl text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h4>
                    <p className="text-gray-600">For urgent matters and immediate help.</p>
                    <a href="tel:+917327050111" className="font-semibold text-indigo-600 hover:text-indigo-800 mt-2 inline-block">+91-7327050111</a>
                </div>
                {/* FAQ Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-4">
                        <IoChatbubbleEllipsesOutline className="text-3xl text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">FAQs</h4>
                    <p className="text-gray-600">Find answers to common questions.</p>
                    <Link to="/faq" className="font-semibold text-indigo-600 hover:text-indigo-800 mt-2 inline-block">Visit our FAQs</Link>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
