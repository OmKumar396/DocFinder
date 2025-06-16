import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/Footer';
import Hospital from './pages/Hospital';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import About from './pages/About';
import Ambulance from './pages/Ambulance';
import HospitalLogin from './Hospital_pages/HospitalLogin';
import HospitalHome from './Hospital_pages/HospitalHome';
import HospitalRegistration from './Hospital_pages/HospitalRegistration';
import AmbulanceRegistration from './Hospital_pages/AmbulanceRegistration';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/hospital-home" element={<HospitalHome />} />
        <Route path="/hospitals" element={<Hospital />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} /> 
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/hospital-registration" element={<HospitalRegistration />} />
        <Route path="/ambulance-registration" element={<AmbulanceRegistration />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;