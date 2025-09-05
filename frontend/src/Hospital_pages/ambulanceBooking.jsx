import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaAmbulance, FaHospital, FaPhoneAlt, FaUserMd, FaShieldAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { IoLogInOutline, IoPersonAddOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AmbulanceBooking = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data only if the user is logged in
  useEffect(() => {
    const fetchAvailableAmbulances = () => {
      setLoading(true);
      axios.get('https://docfinder-3pkx.onrender.com/api/ambulances/available')
        .then(res => {
          setAmbulances(res.data);
        })
        .catch(err => {
          console.error('Error fetching available ambulances:', err);
          toast.error('Could not fetch available ambulances.');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (user) {
      fetchAvailableAmbulances();
    } else {
      setLoading(false); // No data to load for guests
    }
  }, [user]); // Re-run when login status changes

  const handleBookAmbulance = (ambulanceId) => {
    if (!user?._id) {
      toast.error('You must be logged in to book an ambulance.');
      return;
    }
    const bookingPromise = axios.post(`https://docfinder-3pkx.onrender.com/api/ambulances/book/${ambulanceId}`, {
      userId: user._id,
    });
    toast.promise(
      bookingPromise,
      {
        pending: 'Booking ambulance, please wait...',
        success: 'Ambulance booked successfully! Check your email for details.',
        error: 'Booking failed. The ambulance may have just been taken.'
      }
    );
    bookingPromise.then(() => {
      // Refresh the list after successful booking
      const updatedAmbulances = ambulances.filter(amb => amb._id !== ambulanceId);
      setAmbulances(updatedAmbulances);
    }).catch(err => {
      console.error('Booking error:', err);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {user ? (
          // --- LOGGED-IN VIEW ---
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Request an Ambulance</h1>
              <p className="mt-2 text-lg text-gray-600">Choose from the list of available ambulances below.</p>
            </div>
            {loading ? (
              <p className="text-center text-gray-600">Loading available ambulances...</p>
            ) : ambulances.length === 0 ? (
              <div className="text-center bg-white p-10 rounded-xl shadow-md">
                <p className="text-xl font-semibold text-gray-700">No Ambulances Available</p>
                <p className="text-gray-500 mt-2">We're sorry, but no ambulances are available at this moment. Please check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ambulances.map(amb => (
                  <div key={amb._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transition hover:shadow-2xl hover:-translate-y-1">
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FaAmbulance className="text-blue-500 text-2xl" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{amb.vehicleNumber}</h2>
                      </div>
                      <div className="space-y-3 text-gray-700">
                        <p className="flex items-center gap-3"><FaHospital className="text-gray-400" /> <strong>Hospital:</strong> {amb.hospital?.name || 'Info Unavailable'}</p>
                        <p className="flex items-center gap-3"><FaUserMd className="text-gray-400" /> <strong>Driver:</strong> {amb.driverName}</p>
                        <p className="flex items-center gap-3"><FaPhoneAlt className="text-gray-400" /> <strong>Contact:</strong> {amb.contact}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookAmbulance(amb._id)}
                      className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // --- LOGGED-OUT VIEW ---
          <>
            <div className="text-center py-16">
              <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">24/7 <span className="text-blue-600">Emergency Ambulance</span> Service</h1>
              <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">Fast, reliable, and connected to a network of trusted hospitals. Log in or create an account to book an ambulance in seconds.</p>
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/login" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <IoLogInOutline /> Login
                </Link>
                <Link to="/signup" className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center gap-2">
                  <IoPersonAddOutline /> Sign Up
                </Link>
              </div>
            </div>
            
            <div className="py-16">
                 <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
                     <p className="mt-2 text-lg text-gray-600">Providing swift and professional medical transport when you need it most.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-100 rounded-full mb-4">
                            <FaClock className="text-3xl text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Availability</h3>
                        <p className="text-gray-600">See a live list of all available ambulances from hospitals in our network, ensuring you find one without delay.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-100 rounded-full mb-4">
                            <FaShieldAlt className="text-3xl text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Providers</h3>
                        <p className="text-gray-600">Every ambulance is linked to a registered hospital, so you can be assured of professional and trusted service.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-100 rounded-full mb-4">
                            <FaCheckCircle className="text-3xl text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Booking</h3>
                        <p className="text-gray-600">Secure an ambulance with a single click. No phone calls, no waiting—just fast, confirmed booking.</p>
                    </div>
                 </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AmbulanceBooking;