import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Footer from './components/Footer';
import Hospital from './pages/Hospital';
import Signup from './pages/Signup';
import { useJsApiLoader } from '@react-google-maps/api'; 
import Contact from './pages/Contact';
import About from './pages/About';
import Ambulance from './pages/Ambulance';
import HospitalLogin from './Hospital_pages/HospitalLogin';
import HospitalHome from './Hospital_pages/HospitalHome';

const googleMapsLibraries = ['places'];

const App = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script-app', 
    googleMapsApiKey: "AIzaSyCJvv4irHHrWnvYPRK76EGN-A51RGXGHZ4",
    libraries: googleMapsLibraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home isGoogleMapsLoaded={isLoaded} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/hospital-home" element={<HospitalHome />} />
        <Route path="/hospitals" element={<Hospital isGoogleMapsLoaded={isLoaded} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} /> 
        <Route path="/ambulance" element={<Ambulance />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;