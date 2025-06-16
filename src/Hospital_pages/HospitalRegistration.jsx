import React, { useState, useEffect } from "react";

// This function gets the registration number from localStorage (set during login/signup)
const getRegistrationIdFromAccount = () => {
  return localStorage.getItem("registrationId") || "";
};

const HospitalRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    bedsAvailable: "",
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
    setMessage("Hospital registration submitted! We will verify and contact you soon.");
    setForm((prev) => ({
      ...prev,
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
      bedsAvailable: "",
      description: "",
      // registrationId stays the same
    }));
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex flex-col items-center py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-[#ff8c00] mb-4 text-center">
          Register Your Hospital
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Fill in your hospital details below. Your registration number is auto-filled from your login.
        </p>
        {message && (
          <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-4 text-center font-semibold shadow">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Hospital Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter hospital name"
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
              <label className="block text-gray-800 font-semibold mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Enter address"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
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
              <label className="block text-gray-800 font-semibold mb-1">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                placeholder="State"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                placeholder="Pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1">Beds Available</label>
              <input
                type="number"
                name="bedsAvailable"
                value={form.bedsAvailable}
                onChange={handleChange}
                required
                min={0}
                placeholder="Number of beds"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe your hospital, specialties, or services"
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
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff8c00] text-white font-bold py-3 rounded-full text-lg mt-2 hover:bg-orange-700 transition"
          >
            Register Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalRegistration;