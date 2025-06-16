import React, { useState, useEffect } from "react";

// Get registration number from localStorage (set during login/signup)
const getRegistrationIdFromAccount = () => {
  return localStorage.getItem("registrationId") || "";
};

const AmbulanceRegistration = () => {
  const [form, setForm] = useState({
    driverName: "",
    ambulanceNumber: "",
    phone: "",
    city: "",
    registrationId: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const regId = getRegistrationIdFromAccount();
    setForm((prev) => ({ ...prev, registrationId: regId }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Ambulance registration submitted!");
    setForm((prev) => ({
      ...prev,
      driverName: "",
      ambulanceNumber: "",
      phone: "",
      city: "",
      description: "",
      // registrationId stays the same
    }));
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-cyan-50 flex flex-col items-center py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-cyan-700 text-center mb-4">
          Ambulance Registration
        </h2>
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-center font-semibold shadow">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={form.driverName}
              onChange={handleChange}
              required
              placeholder="Enter driver name"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Ambulance Number</label>
            <input
              type="text"
              name="ambulanceNumber"
              value={form.ambulanceNumber}
              onChange={handleChange}
              required
              placeholder="Enter ambulance number"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter contact number"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              placeholder="City"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={2}
              placeholder="Describe your ambulance or services"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Registration Number</label>
            <input
              type="text"
              name="registrationId"
              value={form.registrationId}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none text-gray-500 cursor-not-allowed"
              placeholder="Auto-filled from your account"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-700 text-white font-bold py-3 rounded-full text-lg mt-2 hover:bg-cyan-800 transition"
          >
            Register Ambulance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AmbulanceRegistration;