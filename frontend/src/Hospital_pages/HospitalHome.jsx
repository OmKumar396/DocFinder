import React, { useState, useEffect, useContext } from 'react';
import { IoBedOutline, IoCarSportOutline, IoCalendarClearOutline, IoMailOutline, IoLogoLinkedin } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have AuthContext

// This data can be fetched from an API in the future
const portalFeatures = [
  {
    title: "Manage Beds",
    description: "Update bed availability and view/manage patient bookings in real-time.",
    link: "/hospital/dashboard", // Main dashboard for beds
    icon: <IoBedOutline />,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Manage Ambulances",
    description: "Register new ambulances and update the status of your emergency fleet.",
    link: "/ambulance-registration",
    icon: <IoCarSportOutline />,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "View Appointments",
    description: "See a list of all patient appointments and bed bookings for your facility.",
    link: "/hospital/appointments",
    icon: <IoCalendarClearOutline />,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  }
];

// Placeholder team data
const team = [
  {
    name: "Dr. Priya Sharma",
    role: "Hospital Admin",
    image: "https://i.pravatar.cc/150?u=priya",
    email: "priya@hospital.com",
    linkedin: "#"
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/150?u=rajesh",
    email: "rajesh@hospital.com",
    linkedin: "#"
  }
];

const HospitalHome = () => {
  const { user } = useContext(AuthContext); // Get logged-in hospital info
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Placeholder stats - can be fetched from an API
  const stats = {
      bedsAvailable: 25,
      ambulancesOnDuty: 8,
      todaysAppointments: 12,
  };

  return (
    <div className={`min-h-screen bg-slate-50 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* --- Header & Stats Section --- */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Welcome, {user?.name || 'Hospital Team'}
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Here's an overview of your hospital's status today.
          </p>
          {/* Stat Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Beds Available</p>
                  <p className="text-3xl font-bold text-green-600">{stats.bedsAvailable}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Ambulances on Duty</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.ambulancesOnDuty}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.todaysAppointments}</p>
              </div>
          </div>
        </div>

        {/* --- Portal Features Section --- */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Hospital Portal</h2>
            <p className="mt-3 text-lg text-gray-600">Quickly access your management tools below.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portalFeatures.map((feature, idx) => (
              <Link key={idx} to={feature.link} className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 border border-gray-200 transition-all duration-300">
                <div className={`flex items-center justify-center h-16 w-16 ${feature.bgColor} rounded-full mb-6 text-3xl ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* --- Team Contacts Section --- */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Admin Contacts</h2>
            <p className="mt-3 text-lg text-gray-600">Reach out to your support team for any assistance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6 border border-gray-200">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-200" />
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-indigo-600 font-semibold mb-3">{member.role}</p>
                    <div className="flex space-x-3 text-xl">
                      <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-indigo-600 transition-colors">
                        <IoMailOutline />
                      </a>
                      <a href={member.linkedin} className="text-gray-500 hover:text-indigo-600 transition-colors">
                        <IoLogoLinkedin />
                      </a>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HospitalHome;