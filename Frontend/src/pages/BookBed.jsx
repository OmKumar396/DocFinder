import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookBed = () => {
  const { id: hospitalId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) return setMsg('You must be logged in to book.');

    try {
      setLoading(true);
      setMsg('');
      const response = await axios.post('https://doc-finder-kappa.vercel.app/api/appointments/book', {
        userId: user._id,
        email: user.email,
        hospitalId,
        ...formData,
      });
      setLoading(false);
      setMsg('Booking successful!');
      setFormData({ patientName: '', age: '', reason: '' });
      setTimeout(() => navigate('/dashboard'), 2000); // redirect after 2s
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMsg(err.response?.data?.message || 'Booking failed.');
    }
    console.log("📤 Sending data:", {
  userId: user?._id,
  hospitalId,
  ...formData
});

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50 px-4">
      <form
        onSubmit={handleBook}
        className="bg-white shadow-md p-8 rounded-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#ff8c00]">Book a Bed</h2>

        <label className="block mb-2 text-gray-700 font-medium">Patient Name</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c00]"
        />

        <label className="block mb-2 text-gray-700 font-medium">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c00]"
        />

        <label className="block mb-2 text-gray-700 font-medium">Reason (optional)</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c00]"
        />

        {msg && (
          <div className={`mb-4 text-center font-medium ${msg.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
            {msg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff8c00] text-white py-2 rounded-md font-semibold hover:bg-[#e67e00] transition"
        >
          {loading ? 'Booking...' : 'Book Bed'}
        </button>
      </form>
    </div>
  );
};

export default BookBed;


