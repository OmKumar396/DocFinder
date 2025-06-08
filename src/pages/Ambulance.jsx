import React, { useState, useEffect } from 'react';
import { IoCallOutline, IoLocationOutline, IoTimeOutline, IoCarSportOutline } from 'react-icons/io5';

// Dummy hospitals data (replace with backend fetch)
const allHospitals = [
  { id: 1, name: "City Hospital", city: "Delhi" },
  { id: 2, name: "Sunrise Medical", city: "Delhi" },
  { id: 3, name: "Green Valley Hospital", city: "Mumbai" },
  { id: 4, name: "Metro Care", city: "Mumbai" }
];

// Dummy ambulances data (replace with backend fetch)
const allAmbulances = [
  {
    id: 1,
    name: "CityCare Ambulance",
    type: "ALS (Advanced Life Support)",
    phone: "9876543210",
    eta: "10 min",
    location: "Near City Hospital",
    registeredBy: "City Hospital",
    city: "Delhi"
  },
  {
    id: 2,
    name: "Rapid Response",
    type: "BLS (Basic Life Support)",
    phone: "9123456780",
    eta: "15 min",
    location: "Downtown",
    registeredBy: "Sunrise Medical",
    city: "Delhi"
  },
  {
    id: 3,
    name: "SafeMove Ambulance",
    type: "Patient Transport",
    phone: "9988776655",
    eta: "8 min",
    location: "Sector 21",
    registeredBy: "Green Valley Hospital",
    city: "Mumbai"
  }
];

const getTodayTimeMin = () => {
  const now = new Date();
  return now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
};

const Ambulance = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    city: '',
    destination: '',
    time: ''
  });
  const [message, setMessage] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [filteredAmbulances, setFilteredAmbulances] = useState([]);

  // Update hospitals and ambulances dropdown based on city
  useEffect(() => {
    if (form.city) {
      setFilteredHospitals(allHospitals.filter(h => h.city.toLowerCase() === form.city.toLowerCase()));
      setFilteredAmbulances(allAmbulances.filter(a => a.city.toLowerCase() === form.city.toLowerCase()));
    } else {
      setFilteredHospitals([]);
      setFilteredAmbulances([]);
    }
  }, [form.city]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      // Reset destination if city changes
      ...(name === "city" ? { destination: "" } : {})
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend API
    setMessage('Your ambulance booking request has been received! We will contact you shortly.');
    setForm({ name: '', phone: '', pickup: '', city: '', destination: '', time: '' });
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 font-inter">
      <div className="w-full max-w-5xl bg-orange-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Booking Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#ff8c00] mb-4">Book an Ambulance</h2>
          <p className="text-gray-700 mb-6">Fill in your details and our team will dispatch the nearest available ambulance.</p>
          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-4 text-center font-semibold shadow">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Your Name</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <span className="px-3 text-xl text-gray-400"><IoCarSportOutline /></span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <span className="px-3 text-xl text-gray-400"><IoCallOutline /></span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Pickup Address</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <span className="px-3 text-xl text-gray-400"><IoLocationOutline /></span>
                <input
                  type="text"
                  name="pickup"
                  value={form.pickup}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                  placeholder="Enter pickup address"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">City</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                  placeholder="Enter city"
                  list="city-list"
                />
                <datalist id="city-list">
                  {[...new Set(allHospitals.map(h => h.city))].map((city, idx) => (
                    <option key={idx} value={city} />
                  ))}
                </datalist>
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Destination Hospital</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <span className="px-3 text-xl text-gray-400"><IoLocationOutline /></span>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                  disabled={!filteredHospitals.length}
                >
                  <option value="">Select hospital</option>
                  {filteredHospitals.map(h => (
                    <option key={h.id} value={h.name}>{h.name}</option>
                  ))}
                </select>
              </div>
              {!filteredHospitals.length && (
                <div className="text-xs text-gray-400 mt-1 ml-2">Enter city to see hospitals</div>
              )}
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Preferred Pickup Time</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                <span className="px-3 text-xl text-gray-400"><IoTimeOutline /></span>
                <input
                  type="datetime-local"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-none rounded-xl focus:outline-none"
                  min={getTodayTimeMin()}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff8c00] text-white py-3 rounded-full font-bold text-lg mt-2 hover:bg-orange-700 transition"
            >
              Book Ambulance
            </button>
          </form>
        </div>
        {/* Registered Ambulances Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-[#febd76] to-[#ff8c00] flex flex-col justify-center items-center p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Registered Ambulances</h2>
          <div className="w-full space-y-4">
            {filteredAmbulances.length ? filteredAmbulances.map((amb) => (
              <div key={amb.id} className="bg-white/20 rounded-xl p-4 shadow flex flex-col mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">{amb.name}</span>
                  <span className="bg-white/80 text-[#ff8c00] px-3 py-1 rounded-full text-xs font-bold">{amb.type}</span>
                </div>
                <div className="flex items-center text-sm mb-1">
                  <IoLocationOutline className="mr-2" /> {amb.location}
                </div>
                <div className="flex items-center text-sm mb-1">
                  <IoTimeOutline className="mr-2" /> ETA: {amb.eta}
                </div>
                <div className="flex items-center text-sm">
                  <IoCallOutline className="mr-2" /> <a href={`tel:${amb.phone}`} className="underline">{amb.phone}</a>
                </div>
                <div className="text-xs text-white/80 mt-1">Registered by: {amb.registeredBy}</div>
              </div>
            )) : (
              <div className="text-white/80 text-center">No ambulances found for this city.</div>
            )}
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Emergency?</h3>
            <p className="mb-2">Call our 24/7 ambulance helpline:</p>
            <a href="tel:102" className="bg-white text-[#ff8c00] px-6 py-2 rounded-full font-bold shadow hover:bg-orange-100 transition">Call 102</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambulance;