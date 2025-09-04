import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HospitalBeds = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const res = await axios.get('https://doc-finder-ten.vercel.app/api/hospital-details');
        setHospitals(res.data);
      } catch (err) {
        console.error('Failed to fetch hospital details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-[#ff8c00] text-center">Hospital Bed Records</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-[#ff8c00] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Hospital Name</th>
                <th className="py-3 px-4 text-left">Registration No</th>
                <th className="py-3 px-4 text-left">Beds Available</th>
                <th className="py-3 px-4 text-left">Beds Booked</th>
                <th className="py-3 px-4 text-left">Total Beds</th>
                <th className="py-3 px-4 text-left">City</th>
                <th className="py-3 px-4 text-left">State</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">No hospitals registered</td>
                </tr>
              ) : (
                hospitals.map((hospital, idx) => (
                  <tr key={idx} className="border-t border-gray-200 hover:bg-orange-50 transition-all">
                    <td className="py-3 px-4">{hospital.name || 'N/A'}</td>
                    <td className="py-3 px-4">{hospital.registrationNumber}</td>
                    <td className="py-3 px-4">{hospital.bedsAvailable}</td>
                    <td className="py-3 px-4">{hospital.bedsBooked || 0}</td>
                    <td className="py-3 px-4">{(hospital.bedsAvailable || 0) + (hospital.bedsBooked || 0)}</td>
                    <td className="py-3 px-4">{hospital.city || '-'}</td>
                    <td className="py-3 px-4">{hospital.state || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HospitalBeds;

