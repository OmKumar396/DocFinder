import React, { useState, useEffect } from 'react';
import { IoBedOutline, IoPeopleOutline, IoAddCircleOutline, IoLogOutOutline, IoMailOutline, IoLogoLinkedin } from 'react-icons/io5';

const hospitalFeatures = [
  {
    icon: <IoBedOutline />,
    title: "Manage Beds",
    description: "Easily update and monitor your hospital's bed availability in real time.",
    bgColor: "bg-orange-100 text-[#ff8c00]"
  },
  {
    icon: <IoPeopleOutline />,
    title: "Patient Requests",
    description: "View and respond to patient bed requests quickly and efficiently.",
    bgColor: "bg-amber-100 text-[#ff8c00]"
  },
  {
    icon: <IoAddCircleOutline />,
    title: "Add New Beds",
    description: "Add new beds or update existing ones as your hospital grows.",
    bgColor: "bg-orange-50 text-[#ff8c00]"
  },
  {
    icon: <IoLogOutOutline />,
    title: "Secure Logout",
    description: "Your data is safe. Logout securely anytime.",
    bgColor: "bg-amber-50 text-[#ff8c00]"
  }
];

const team = [
  {
    name: "Dr. Priya Sharma",
    role: "Hospital Admin",
    image: "https://placehold.co/200x200/ff8c00/fff?text=PS",
    email: "priya@hospital.com",
    linkedin: "#"
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Bed Manager",
    image: "https://placehold.co/200x200/ff8c00/fff?text=RK",
    email: "rajesh@hospital.com",
    linkedin: "#"
  }
];

const HospitalHome = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row w-screen h-[70vh] bg-white">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center p-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#ff8c00] mb-4">Welcome, Hospital Team</h1>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            Manage your hospital's bed availability, respond to patient requests, and keep your data up to date—all in one place.
          </p>
          <a href="/hospital-dashboard">
            <button className="hover:bg-[#ff8c00] text-[#ff8c00] font-semibold hover:text-white rounded-md border-2 border-[#ff8c00] px-6 py-3 duration-200">
              Go to Dashboard
            </button>
          </a>
        </div>
        
        {/* Right */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
            <img src="src/images/hospital.png" alt="Hospital" className="object-cover" />
        </div>

      </div>

      {/* Quick Stats Section */}
      <div className="py-12 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <IoBedOutline className="text-4xl text-[#ff8c00] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800">120</h3>
            <p className="text-gray-600">Total Beds</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <IoPeopleOutline className="text-4xl text-[#ff8c00] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800">15</h3>
            <p className="text-gray-600">Pending Requests</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <IoAddCircleOutline className="text-4xl text-[#ff8c00] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800">8</h3>
            <p className="text-gray-600">Beds Available</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Hospital <span className='text-[#ff8c00]'>Features</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tools to help you manage your hospital efficiently</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitalFeatures.map((feature, idx) => (
              <div key={idx} className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 bg-white`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl ${feature.bgColor}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team/Admin Contacts Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Hospital <span className="text-[#ff8c00]">Team</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Contact your hospital admin team for support or updates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-orange-50 rounded-2xl shadow-md p-8 flex flex-col items-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex space-x-3">
                  <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-[#ff8c00] flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                    <IoMailOutline />
                  </a>
                  <a href={member.linkedin} className="w-10 h-10 rounded-full bg-[#ff8c00] flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                    <IoLogoLinkedin />
                  </a>
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