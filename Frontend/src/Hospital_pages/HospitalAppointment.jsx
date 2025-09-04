import React, { useEffect, useState } from 'react';
import axios from 'axios';

// --- UI Enhancement Components ---

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
);

const EmptyState = () => (
    <div className="text-center py-20 bg-slate-50 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-slate-900">No Appointments</h3>
        <p className="mt-1 text-sm text-slate-500">There are currently no appointments scheduled for this hospital.</p>
    </div>
);

const ConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-slate-900">Confirm Completion</h3>
            <p className="mt-2 text-sm text-slate-600">Are you sure you want to mark this appointment as complete? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end space-x-3">
                <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition">Cancel</button>
                <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">Confirm</button>
            </div>
        </div>
    </div>
);


// --- Main Component ---

const HospitalAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            const hospitalDataString = localStorage.getItem('user');
            if (!hospitalDataString) {
                setError('Hospital not logged in. Please log in again.');
                setLoading(false);
                return;
            }

            let correctId;
            try {
                const hospitalData = JSON.parse(hospitalDataString);
                correctId = hospitalData._id;
            } catch (e) {
                correctId = hospitalDataString;
            }

            if (!correctId) {
                setError('Could not determine a valid Hospital ID.');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`https://doc-finder-ten.vercel.app/api/appointments/hospital/${correctId}`);
                setAppointments(res.data);
            } catch (err) {
                setError('Failed to fetch appointments from the server.');
                console.error('Error fetching appointments:', err.response || err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const openConfirmationModal = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setIsModalOpen(true);
    };

    const handleComplete = async () => {
        if (!selectedAppointmentId) return;
        try {
            setAppointments((prev) => prev.filter((appt) => appt._id !== selectedAppointmentId));
            await axios.put(`https://doc-finder-ten.vercel.app/api/appointments/complete/${selectedAppointmentId}`);
        } catch (err) {
            console.error('Error completing appointment:', err);
            setError('Could not complete appointment. Please refresh and try again.');
        } finally {
            setIsModalOpen(false);
            setSelectedAppointmentId(null);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center">
                        <svg className="h-10 w-10 text-white mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
                        </svg>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Hospital Appointments</h1>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <p className="text-center text-red-600 font-semibold bg-red-100 p-4 rounded-lg">{error}</p>
                    ) : appointments.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reason</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {appointments.map((appt) => (
                                        <tr key={appt._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-900">{appt.patientName}</div>
                                                        <div className="text-sm text-slate-500">{appt.userId?.email || `Age: ${appt.age}`}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appt.reason || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    Pending
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button onClick={() => openConfirmationModal(appt._id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    Mark Complete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <ConfirmationModal
                    onConfirm={handleComplete}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default HospitalAppointments;

