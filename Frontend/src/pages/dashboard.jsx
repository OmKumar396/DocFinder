import React, { useEffect, useState } from 'react';
import { FaHospitalAlt, FaAmbulance, FaClipboardList, FaBell, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      axios
        .get(`https://doc-finder-ten.vercel.app/api/appointments/user/${user._id}`)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => console.error('Error fetching appointments:', err))
        .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Hello, {user?.username || 'User'} 👋
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Welcome back to DocFinder. Let's get you the care you need.
          </p>
        </div>

        {/* --- Quick Actions --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Find a Hospital */}
          <div 
            onClick={() => navigate('/hospitals')}
            className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center justify-center h-12 w-12 bg-indigo-100 rounded-full mb-4">
                        <FaHospitalAlt className="text-2xl text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Find a Hospital</h2>
                    <p className="text-gray-600 mt-1">Search for hospitals and check bed availability.</p>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-indigo-600 transition-colors text-2xl" />
            </div>
          </div>
          {/* Book an Ambulance */}
          <div 
            onClick={() => navigate('/book-ambulance')}
            className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
                 <div>
                    <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-full mb-4">
                        <FaAmbulance className="text-2xl text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Book an Ambulance</h2>
                    <p className="text-gray-600 mt-1">Request emergency transport instantly.</p>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors text-2xl" />
            </div>
          </div>
        </div>

        {/* --- Main Content Area (Bookings & Notifications) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <FaClipboardList className="text-green-500" /> Recent Bookings
                    </h2>
                    {appointments.length > 3 && (
                        <Link to="/bookings" className="font-semibold text-indigo-600 hover:text-indigo-800 transition">See All</Link>
                    )}
                </div>
                {loading ? <p>Loading your bookings...</p> : (
                    appointments.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">You have no bookings yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {appointments.slice(0, 3).map((app) => (
                                <li key={app._id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-slate-50 transition">
                                    <div>
                                        <p className="font-bold text-gray-800">{app.hospitalId?.name || 'Unknown Hospital'}</p>
                                        <p className="text-sm text-gray-600">{app.patientName}, Age: {app.age}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
            
            {/* Notifications */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
                    <FaBell className="text-purple-500" /> Notifications
                </h2>
                {loading ? <p>Loading notifications...</p> : (
                    appointments.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No new notifications.</p>
                    ) : (
                        <ul className="space-y-4">
                            {appointments.slice(0, 2).map((app) => (
                                <li key={app._id} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-green-200 flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Bed Booked Successfully!</p>
                                        <p className="text-sm text-gray-600">Your bed at {app.hospitalId?.name || 'Unknown Hospital'} is confirmed.</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </div>
      </div>
    </div>
  );
};


export default UserDashboard;
