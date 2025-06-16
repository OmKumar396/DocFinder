import React, { useState, useEffect } from "react";
import { IoLocationOutline, IoBedOutline, IoPersonOutline, IoCallOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Dummy hospitals data (replace with backend fetch)
const allHospitals = [
  { id: 1, name: "City Hospital", address: "123 Main St", city: "Delhi", bedsAvailable: 12, phone: "9876543210" },
  { id: 2, name: "Sunrise Medical", address: "45 Sunrise Ave", city: "Delhi", bedsAvailable: 8, phone: "9123456780" },
  { id: 3, name: "Green Valley Hospital", address: "Green Valley Rd", city: "Mumbai", bedsAvailable: 5, phone: "9988776655" },
  { id: 4, name: "Metro Care", address: "Metro St", city: "Mumbai", bedsAvailable: 10, phone: "9876501234" },
  { id: 5, name: "Care Plus", address: "Unit 4", city: "Bhubaneswar", bedsAvailable: 7, phone: "9000000000" }
];

// Single, always-shown quote
const quote = "“The best way to find yourself is to lose yourself in the service of others.” – Mahatma Gandhi";

// Patient Details Form
const PatientForm = ({ hospital, onBack }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    setMessage("Patient details submitted! The hospital will contact you soon.");
    setForm({ name: "", age: "", gender: "", contact: "" });
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="mb-4 text-[#ff8c00] hover:underline text-sm"
      >
        ← Back to hospital list
      </button>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Book a Bed at {hospital.name}
      </h2>
      <p className="text-gray-600 mb-4">{hospital.address}</p>
      {message && (
        <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-center font-semibold shadow">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div>
          <label className="block text-gray-700 mb-1">Patient Name</label>
          <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
            <span className="px-3 text-xl text-gray-400"><IoPersonOutline /></span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
              placeholder="Enter patient name"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff8c00]"
            placeholder="Enter age"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff8c00]"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Contact Number</label>
          <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
            <span className="px-3 text-xl text-gray-400"><IoCallOutline /></span>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
              placeholder="Enter contact number"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#ff8c00] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#e67e00] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const HospitalCard = ({ hospital, isSelected, onClick }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 30 }}
    transition={{ duration: 0.3 }}
    className={`border border-gray-200 rounded-xl p-4 mb-4 cursor-pointer shadow transition-all bg-white hover:bg-orange-50 hover:shadow-lg ${
      isSelected ? "bg-orange-100 border-orange-400 shadow-md" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-gray-800 text-lg mb-1">{hospital.name}</h3>
      <span className="bg-[#ff8c00] text-white text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
        <IoBedOutline className="inline-block" /> {hospital.bedsAvailable}
      </span>
    </div>
    <p className="text-gray-600 text-sm mb-1 flex items-center">
      <IoLocationOutline className="inline-block mr-1 text-base text-[#ff8c00]" />
      {hospital.address}
    </p>
    <p className="text-gray-600 text-sm flex items-center">
      <IoCallOutline className="inline-block mr-1 text-base text-[#ff8c00]" />
      {hospital.phone}
    </p>
  </motion.div>
);

const Hospital = () => {
  const [formCity, setFormCity] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter hospitals by city
  useEffect(() => {
    if (formCity) {
      setIsLoading(true);
      setTimeout(() => {
        setFilteredHospitals(allHospitals.filter(h => h.city.toLowerCase() === formCity.toLowerCase()));
        setIsLoading(false);
      }, 400);
    } else {
      setFilteredHospitals([]);
    }
  }, [formCity]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 font-inter">
      <div className="w-full max-w-5xl bg-orange-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Hospital List Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Find a <span className="text-[#ff8c00]">Hospital</span></h2>
          <form
            onSubmit={e => e.preventDefault()}
            className="mb-6 flex flex-col gap-4"
          >
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
              <span className="px-3 text-xl text-gray-400"><IoLocationOutline /></span>
              <input
                type="text"
                name="city"
                value={formCity}
                onChange={e => {
                  setFormCity(e.target.value);
                  setSelectedHospital(null);
                }}
                required
                className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                placeholder="Enter city"
                list="city-list"
              />
              <datalist id="city-list">
                {[...new Set(allHospitals.map(h => h.city))].map((city, idx) => (
                  <option key={idx} value={city} />
                ))}
              </datalist>
            </div>
          </form>
          <div className="max-h-[400px] overflow-y-auto mt-2">
            {isLoading && <p className="text-gray-600">Loading hospitals...</p>}
            <AnimatePresence>
              {!isLoading && filteredHospitals.length > 0 ? (
                filteredHospitals.map(hospital => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    isSelected={selectedHospital && selectedHospital.id === hospital.id}
                    onClick={() => setSelectedHospital(hospital)}
                  />
                ))
              ) : (
                !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 mt-4"
                  >
                    {formCity
                      ? `No registered hospitals found in ${formCity}.`
                      : "Enter a city to find hospitals."}
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Right Side: Single Quote or Patient Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-tr from-[#febd76] to-[#ff8c00] p-8 md:p-12">
          {!selectedHospital ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-white text-center">
              <span className="text-3xl mb-4">❝</span>
              <p className="text-xl italic">{quote}</p>
            </div>
          ) : (
            <PatientForm
              hospital={selectedHospital}
              onBack={() => setSelectedHospital(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hospital;