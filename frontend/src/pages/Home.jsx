import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SplitText from '@/components/SplitText/SplitText';
import {
  IoLocationOutline, IoSearchOutline, IoCalendarOutline, IoCheckmarkCircleOutline,
  IoShieldCheckmark, IoTimeOutline, IoArrowForward, IoHeadset, IoStar
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Assuming your homeData file exports these arrays
import { testimonials, features } from '@/data/homeData';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();

  const [popularCities, setPopularCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://docfinder-3pkx.onrender.com/api/hospital/cities");
        const formattedCities = response.data.map(city => ({
          name: city._id,
          beds: city.totalBedsAvailable,
        }));
        setPopularCities(formattedCities);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      } finally {
        setIsLoadingCities(false);
      }
    };
    fetchCities();
  }, []);

  const handleCitySelect = (city) => {
    setSearchCity(city.name);
    setShowCities(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim() !== '') {
      navigate(`/hospitals?city=${encodeURIComponent(searchCity.trim())}`);
    }
  };

  const iconMap = {
    IoTimeOutline: <IoTimeOutline />,
    IoSearchOutline: <IoSearchOutline />,
    IoCheckmarkCircleOutline: <IoCheckmarkCircleOutline />,
    IoShieldCheckmark: <IoShieldCheckmark />,
  };

  return (
    // ✅ THE FIX: Added `overflow-hidden` to prevent horizontal scrolling on mobile
    <div className={`transition-opacity duration-1000 bg-white overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop')]"></div>
        <div className="absolute inset-0 bg-slate-800/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-white text-center md:text-left">
          <div className="max-w-3xl">
            <SplitText
              text="Compassionate Care,"
              className="text-5xl md:text-7xl font-bold"
              delay={150}
            />
            <SplitText
              text="Seamlessly Connected."
              className="text-5xl md:text-7xl font-bold text-teal-400"
              delay={150}
            />
            <p className="mt-6 text-lg text-slate-200 max-w-xl mx-auto md:mx-0">
              The premier platform for finding and securing hospital beds. We connect you to a network of verified hospitals for stress-free medical planning.
            </p>
            {!user && (
              <div className='mt-10'>
                <Link to="/signup">
                  <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg px-8 py-4 text-lg transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-3">Find a <span className='text-teal-500'>Hospital Bed</span> Instantly</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Enter your location to begin your search.</p>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative bg-white p-5 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
                <input
                  type="text"
                  placeholder="Enter city name (e.g., Bhubaneswar)"
                  value={searchCity}
                  onChange={(e) => {
                    setSearchCity(e.target.value);
                    setShowCities(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowCities(true)}
                  className="w-full pl-14 pr-4 py-4 rounded-xl bg-slate-100 border-2 border-transparent hover:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 text-lg"
                />
                {showCities && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto border border-slate-200">
                    {popularCities
                      .filter(city => city.name.toLowerCase().includes(searchCity.toLowerCase()))
                      .map((city, idx) => (
                        <div key={idx} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => handleCitySelect(city)}>
                          <div className="flex items-center gap-3">
                            <IoLocationOutline className="text-teal-500" />
                            <span className="font-medium text-slate-700">{city.name}</span>
                          </div>
                          <span className="text-sm text-slate-500">{city.beds} beds available</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl px-8 py-4 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center transform hover:scale-105">
                <IoSearchOutline className="mr-2 text-xl" />
                <span className="text-lg">Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-800">A Simpler Path to Care</h2>
                  <p className="mt-4 text-lg text-slate-600">Three easy steps to secure the medical attention you need.</p>
              </div>
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Dashed line for desktop */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full border-t-2 border-dashed border-slate-300 -translate-y-1/2"></div>
                  
                  <div className="relative text-center">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-8 border-slate-50">1</div>
                      <div className="bg-white p-8 pt-16 rounded-2xl shadow-lg border border-slate-100">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Search by City</h3>
                          <p className="text-slate-600">Enter your location to see a list of verified hospitals with real-time bed availability.</p>
                      </div>
                  </div>
                  <div className="relative text-center">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-8 border-slate-50">2</div>
                      <div className="bg-white p-8 pt-16 rounded-2xl shadow-lg border border-slate-100">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">View Details</h3>
                          <p className="text-slate-600">Compare hospitals based on available beds, location, and contact information.</p>
                      </div>
                  </div>
                  <div className="relative text-center">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-teal-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold border-8 border-slate-50">3</div>
                      <div className="bg-white p-8 pt-16 rounded-2xl shadow-lg border border-slate-100">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Book Instantly</h3>
                          <p className="text-slate-600">Secure a bed with a single click and receive immediate confirmation.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-3">Explore by <span className='text-teal-500'>Location</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Find care in major hubs across the region.</p>
          </div>
          {isLoadingCities ? <p className="text-center">Loading cities...</p> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCities.slice(0, 6).map((city, index) => (
                <div key={index} className="relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <img src={`https://source.unsplash.com/800x600/?${city.name},city`} alt={city.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-3xl font-bold text-white">{city.name}</h3>
                    <p className="text-md font-semibold text-teal-300 mt-1">{city.beds} beds available</p>
                    <a href={`/hospitals?city=${city.name}`} className="inline-flex items-center mt-4 text-md font-bold text-white hover:text-teal-300 transition-colors">
                      View Hospitals <IoArrowForward className="ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-3">Trusted by <span className='text-teal-500'>Patients & Families</span></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 p-8 border border-slate-100">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || `https://i.pravatar.cc/100?u=${testimonial.name}`}
                      alt={testimonial.name}
                      className="w-16 h-16 object-cover rounded-full mr-5 border-2 border-teal-300"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xl">{testimonial.name}</h4>
                      <p className="text-slate-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-slate-300"} />
                    ))}
                  </div>
                  <p className="text-slate-600 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;