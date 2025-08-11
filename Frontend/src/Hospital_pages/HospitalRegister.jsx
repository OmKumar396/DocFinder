import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HospitalRegister = () => {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
  registrationNumber: '', // ✅ fixed key name here
  name: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  phone: '',
  email: '',
  bedsAvailable: '',
  description: '',
});

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/hospital/register-details', formData);
      setMessage(res.data.message);
      navigate('/hospital/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-10">
      <h2 className="text-3xl font-bold text-center text-[#ff8c00] mb-6">Register Your Hospital</h2>

      {message && (
        <div className="mb-4 text-center text-red-600 font-medium">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} required className="input" />
        <input type="text" name="name" placeholder="Hospital Name" value={formData.name} onChange={handleChange} required className="input" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="input" />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="input" />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="input" />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required className="input" />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="input" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input" />
        <input type="number" name="bedsAvailable" placeholder="Beds Available" value={formData.bedsAvailable} onChange={handleChange} required className="input" />
        <textarea name="description" placeholder="Hospital Description" value={formData.description} onChange={handleChange} className="col-span-full input h-24 resize-none" />
        <button type="submit" className="col-span-full bg-[#ff8c00] text-white py-3 rounded-md hover:bg-orange-600 transition-all font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HospitalRegister;
