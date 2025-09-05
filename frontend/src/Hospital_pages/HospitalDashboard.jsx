import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaUserMd, FaAmbulance, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';

const HospitalDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [bedsAvailable, setBedsAvailable] = useState(0);
  const [bedsBooked, setBedsBooked] = useState(0);

  const totalBeds = bedsAvailable + bedsBooked;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get('https://docfinder-3pkx.onrender.com/api/hospital/all');
        setHospitals(res.data);

        // Optionally: aggregate beds for summary stats
        let totalAvailable = 0;
        let totalBooked = 0;
        res.data.forEach(h => {
          totalAvailable += h.bedsAvailable || 0;
          totalBooked += h.bedsBooked || 0;
        });
        setBedsAvailable(totalAvailable);
        setBedsBooked(totalBooked);
      } catch (err) {
        console.error("Failed to fetch hospitals", err);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-[#ff8c00] mb-10">
        Hospital Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaBed className="text-4xl text-[#ff8c00] mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Beds</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalBeds}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaBed className="text-4xl text-green-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Beds Available</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{bedsAvailable}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaBed className="text-4xl text-red-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Beds Booked</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{bedsBooked}</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
        <Link to="/hospital-registration" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-center">
          <FaUserMd className="text-5xl text-[#ff8c00] mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Register Hospital</h3>
          <p className="text-gray-600">Add or update hospital details, address, and bed info.</p>
        </Link>

        <Link to="/ambulance-registration" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-center">
          <FaAmbulance className="text-5xl text-[#ff8c00] mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Register Ambulance</h3>
          <p className="text-gray-600">Add ambulance service to your hospital profile.</p>
        </Link>

        <Link to="/hospital/appointments" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-center">
          <FaClipboardList className="text-5xl text-[#ff8c00] mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-1">View Appointments</h3>
          <p className="text-gray-600">Check which users have booked beds in your hospital.</p>
        </Link>
      </div>

      {/* Registered Hospitals Table */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Registered Hospitals</h2>
        {hospitals.length === 0 ? (
          <p className="text-gray-600">No hospitals registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-100 text-gray-700">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Reg. No</th>
                  <th className="py-2 px-4">City</th>
                  <th className="py-2 px-4">State</th>
                  <th className="py-2 px-4">Beds Avail.</th>
                  <th className="py-2 px-4">Beds Booked</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, i) => (
                  <tr key={i} className="border-t hover:bg-orange-50 transition">
                    <td className="py-2 px-4">{hospital.name}</td>
                    <td className="py-2 px-4">{hospital.registrationNumber}</td>
                    <td className="py-2 px-4">{hospital.city}</td>
                    <td className="py-2 px-4">{hospital.state}</td>
                    <td className="py-2 px-4">{hospital.bedsAvailable}</td>
                    <td className="py-2 px-4">{hospital.bedsBooked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
