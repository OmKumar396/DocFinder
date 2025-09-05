import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

// A custom component for the confirmation toast
const ConfirmToast = ({ closeToast, onConfirm }) => (
  <div>
    <p className="font-bold text-white">Confirm Deletion</p>
    <p className="text-sm text-white">Are you sure you want to delete this ambulance?</p>
    <div className="flex justify-end space-x-3 mt-3">
      <button
        onClick={closeToast}
        className="bg-transparent border border-white text-white font-semibold py-1 px-4 rounded-md text-sm hover:bg-white hover:text-red-500 transition"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onConfirm();
          closeToast();
        }}
        className="bg-white text-red-600 font-bold py-1 px-4 rounded-md text-sm hover:bg-red-100 transition"
      >
        Delete
      </button>
    </div>
  </div>
);


// Simple SVG Icons for UI enhancement
const AmbulanceIcon = () => (
    <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.01" /></svg>
);

const AmbulanceRegister = () => {
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        driverName: '',
        contact: '',
        availability: true,
    });
    const [ambulances, setAmbulances] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [hospitalId, setHospitalId] = useState(null);

    // --- CORRECTED useEffect HOOK ---
    useEffect(() => {
        // Get the stored string which might be a full user object
        const hospitalDataString = localStorage.getItem('hospitalId');
        if (hospitalDataString) {
            try {
                // Attempt to parse the string as JSON
                const hospitalData = JSON.parse(hospitalDataString);
                
                // Extract the _id from the parsed object
                const id = hospitalData._id;

                if (id) {
                    // Set the correct ID to state and fetch ambulances
                    setHospitalId(id);
                    fetchAmbulances(id);
                } else {
                    toast.error("Hospital ID could not be found in local data.");
                }
            } catch (error) {
                // If parsing fails, it might be that the stored item is already just the ID string.
                // In that case, we can use it directly.
                console.log("Could not parse hospital data, assuming it's a raw ID.");
                setHospitalId(hospitalDataString);
                fetchAmbulances(hospitalDataString);
            }
        }
    }, []);

    const fetchAmbulances = async (id) => {
        if (!id) return;
        try {
            // Now this request will have the correct URL, e.g., /api/ambulances/hospital/687ca91ccbb1...
            const response = await axios.get(`https://docfinder-3pkx.onrender.com/api/ambulances/hospital/${id}`);
            setAmbulances(response.data);
        } catch (err) {
            console.error("Failed to fetch ambulances:", err.message);
            toast.error("Could not load ambulance data.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hospitalId) {
            toast.error("Hospital ID not found. Cannot proceed.");
            return;
        }
        // The 'hospitalId' state now correctly holds just the ID string
        const payload = { ...formData, hospital: hospitalId };
        try {
            if (editingId) {
                await axios.put(`https://docfinder-3pkx.onrender.com/api/ambulances/${editingId}`, payload);
                toast.success("Ambulance updated successfully");
            } else {
                await axios.post("https://docfinder-3pkx.onrender.com/api/ambulances", payload);
                toast.success("Ambulance registered successfully");
            }
            setFormData({ vehicleNumber: '', driverName: '', contact: '', availability: true });
            setEditingId(null);
            fetchAmbulances(hospitalId);
        } catch (err) {
            console.error("Submit failed:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Operation failed.");
        }
    };

    const handleEdit = (ambulance) => {
        setFormData({
            vehicleNumber: ambulance.vehicleNumber,
            driverName: ambulance.driverName,
            contact: ambulance.contact,
            availability: ambulance.availability,
        });
        setEditingId(ambulance._id);
        window.scrollTo(0, 0); // Scroll to top to see the form
    };

    const handleDelete = (id) => {
        const confirmDelete = async () => {
            try {
                await axios.delete(`https://docfinder-3pkx.onrender.com/api/ambulances/${id}`);
                toast.success("Deleted successfully");
                fetchAmbulances(hospitalId);
            } catch (err) {
                console.error("Delete failed:", err.response?.data || err.message);
                toast.error("Delete failed.");
            }
        };

        // Display the custom confirmation toast
        toast.error(<ConfirmToast onConfirm={confirmDelete} />, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            theme: "colored",
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">

                {/* --- Header Section --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center">
                    <AmbulanceIcon />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Ambulance Fleet Management</h1>
                        <p className="text-gray-500">Register, update, and manage your hospital's ambulances.</p>
                    </div>
                </div>

                {/* --- Form Section --- */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">
                        {editingId ? "✍️ Edit Ambulance Details" : "➕ Register a New Ambulance"}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Form Fields */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle Number</label>
                            <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="e.g., BR01 PA 1234" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition" required />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Driver Name</label>
                            <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} placeholder="Enter driver's full name" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition" required />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
                            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Enter a valid contact number" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition" required />
                        </div>
                        
                        {/* Availability Checkbox */}
                        <div className="col-span-1 flex items-end">
                            <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border w-full h-14 cursor-pointer">
                                <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <span className="font-medium text-gray-700">Is Available?</span>
                            </label>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="md:col-span-2 text-right">
                            <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                                {editingId ? "Update Ambulance" : "Register Ambulance"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Registered Ambulances List --- */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">🚑 Registered Fleet</h3>
                    <div className="space-y-5">
                        {ambulances.length > 0 ? (
                            ambulances.map((amb) => (
                                <div key={amb._id} className="border border-gray-200 p-5 rounded-lg shadow-sm transition hover:shadow-md hover:border-blue-400">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700">
                                            <p><strong>Vehicle:</strong><br/>{amb.vehicleNumber}</p>
                                            <p><strong>Driver:</strong><br/>{amb.driverName}</p>
                                            <p><strong>Contact:</strong><br/>{amb.contact}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end space-y-2 w-full sm:w-auto">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${amb.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {amb.availability ? "Available" : "Unavailable"}
                                            </span>
                                            <div className="flex space-x-2 mt-2">
                                                <button onClick={() => handleEdit(amb)} className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all text-sm font-semibold">Edit</button>
                                                <button onClick={() => handleDelete(amb._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all text-sm font-semibold">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No ambulances have been registered yet.</p>
                                <p className="text-sm text-gray-400">Use the form above to add your first ambulance.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmbulanceRegister;
