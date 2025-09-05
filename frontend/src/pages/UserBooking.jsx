import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaHospitalAlt, FaClock } from 'react-icons/fa';

const UserBookings = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`https://docfinder-3pkx.onrender.com/api/appointments/user/${user._id}`);
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };
    if (user?._id) fetchAppointments();
  }, [user]);

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Your Booking History</h2>
      {appointments.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div key={a._id} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
                <FaHospitalAlt /> {a.hospitalId?.name || 'Unknown Hospital'}
              </h3>
              <p className="text-gray-700">👤 {a.patientName}, Age: {a.age}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaClock /> {new Date(a.createdAt).toLocaleString()}
              </p>
              {a.reason && <p className="text-sm mt-1">📝 Reason: {a.reason}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
