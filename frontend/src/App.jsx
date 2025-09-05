import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HospitalNavbar from './components/HospitalNavbar';
import Footer from './components/Footer';
import HospitalDashboard from './Hospital_pages/HospitalDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hospital from './pages/Hospital';
import Contact from './pages/Contact';
import About from './pages/About';
import HospitalRegister from './Hospital_pages/HospitalRegister';
import Dashboard from './pages/Dashboard';
import HospitalLogin from './Hospital_pages/HospitalLogin';
import HospitalHome from './Hospital_pages/HospitalHome';
import BookBed from './pages/BookBed';
import { AuthContext } from './context/AuthContext';
import UserBookings from './pages/UserBooking';
import HospitalAppointments from './Hospital_pages/HospitalAppointment';
import HospitalAmbulance from "./Hospital_pages/AmbulanceRegister";
const googleMapsLibraries = ['places'];
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AmbulanceBooking from './Hospital_pages/ambulanceBooking';
const App = () => {
  const { user } = useContext(AuthContext);



  return (
    
    <Router>
      {user?.role === 'hospital' ? <HospitalNavbar /> : <Navbar />}
      <Routes>
        <Route path="/bookings" element={<UserBookings />} />
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/hospital-home" element={<HospitalHome />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/hospitals" element={<Hospital/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/hospital-registration" element={<HospitalRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-bed/:id" element={<BookBed />} />
        <Route path="/hospital/appointments" element={<HospitalAppointments />} />
        <Route path="/ambulance-registration" element={<HospitalAmbulance />} />
        <Route path="/book-ambulance" element={<AmbulanceBooking />} />
      </Routes>
      <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
};

export default App;
