import React, { useState, useEffect } from "react";
import { IoLocationOutline, IoCallOutline, IoSearchOutline, IoBedOutline, IoCheckboxOutline, IoLogInOutline, IoPersonAddOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Hospital = () => {
  const { user } = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("https://docfinder-3pkx.onrender.com/api/hospital/all");
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (err) {
        console.error("Failed to fetch hospitals", err);
        setError("Unable to fetch hospitals.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHospitals();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = cityInput.trim().toLowerCase();
    let filtered = hospitals;
    if (search) {
      filtered = filtered.filter(hospital =>
        hospital.city && hospital.city.toLowerCase().includes(search)
      );
    }
    if (showOnlyAvailable) {
      filtered = filtered.filter(h => h.bedsAvailable > 0);
    }
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredHospitals(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {user ? (
          // --- LOGGED-IN VIEW ---
          <>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Find Nearby Hospitals</h1>
                <p className="mt-2 text-lg text-gray-600">Search for hospitals in your city and see real-time bed availability.</p>
            </div>
            
            <form onSubmit={handleSearch} className="mb-10 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4 border border-gray-200">
               <div className="relative flex-grow w-full md:w-auto">
                 <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                 <input
                   type="text"
                   placeholder="Enter City (e.g., Patna)"
                   value={cityInput}
                   onChange={(e) => setCityInput(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-md"
                 />
               </div>
               <div className="flex items-center space-x-3">
                 <input
                   type="checkbox"
                   checked={showOnlyAvailable}
                   onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                   id="availableCheckbox"
                   className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                 />
                 <label htmlFor="availableCheckbox" className="text-gray-700 font-medium">Only show available beds</label>
               </div>
               <button type="submit" className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center text-md">
                 Search
               </button>
            </form>

            <div>
              {isLoading && <p className="text-center text-gray-600">Loading hospitals...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!isLoading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHospitals.length > 0 ? filteredHospitals.map((hospital) => (
                    <div key={hospital._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition hover:shadow-xl hover:-translate-y-1 border border-gray-200">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-900 text-xl">{hospital.name}</h3>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${hospital.bedsAvailable > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {hospital.bedsAvailable} Beds Available
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2 flex items-start gap-2"><IoLocationOutline className="mt-1 text-gray-400 flex-shrink-0" /> <span>{hospital.address}, {hospital.city}</span></p>
                        <p className="text-gray-600 flex items-center gap-2"><IoCallOutline className="text-gray-400" /> {hospital.phone}</p>
                      </div>
                      <Link
                        to={hospital.bedsAvailable > 0 ? `/book-bed/${hospital._id}` : '#'}
                        className={`mt-6 w-full text-center block px-4 py-2 rounded-lg font-semibold transition duration-200 ${ hospital.bedsAvailable > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                        onClick={(e) => { if (hospital.bedsAvailable <= 0) e.preventDefault(); }}>
                        <IoBedOutline className="inline mr-2" /> Book Bed
                      </Link>
                    </div>
                  )) : <p className="text-center text-gray-600 col-span-full">No hospitals found matching your criteria.</p>}
                </div>
              )}
            </div>
          </>
        ) : (
          // --- LOGGED-OUT VIEW ---
          <>
            <div className="text-center py-16">
              <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">Find Your <span className="text-indigo-600">Peace of Mind</span></h1>
              <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">Instantly find and book available hospital beds near you. Log in or create an account to access real-time information and secure your spot in moments of need.</p>
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/login" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition flex items-center gap-2">
                  <IoLogInOutline /> Login
                </Link>
                <Link to="/signup" className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center gap-2">
                  <IoPersonAddOutline /> Sign Up
                </Link>
              </div>
            </div>
            
            <div className="py-16">
                 <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
                     <p className="mt-2 text-lg text-gray-600">A simple, transparent process to get you the care you need.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-4">
                            <IoSearchOutline className="text-3xl text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Search & Filter</h3>
                        <p className="text-gray-600">Enter your city and filter by bed availability to find the perfect hospital for your needs.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-4">
                            <IoBedOutline className="text-3xl text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">2. View Details</h3>
                        <p className="text-gray-600">Get crucial information like address, phone number, and real-time bed counts at a glance.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-100 rounded-full mb-4">
                            <IoCheckboxOutline className="text-3xl text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Book Instantly</h3>
                        <p className="text-gray-600">Secure your bed with a single click and receive an instant confirmation. No hassle, no waiting.</p>
                    </div>
                 </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hospital;