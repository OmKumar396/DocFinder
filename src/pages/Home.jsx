import React, { useState, useEffect } from 'react';
import SplitText from '@/components/SplitText/SplitText';
import {
  IoLocationOutline,
  IoSearchOutline,
  IoCalendarOutline,
  IoHeartOutline,
  IoCheckmarkCircleOutline,
  IoNewspaperOutline,
  IoStarOutline,
  IoTimeOutline,
  IoArrowForward,
  IoShieldCheckmark,
  IoMedical,
  IoMenu,
  IoClose,
  IoMailOutline,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoInstagram
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {
  popularCities,
  testimonials,
  teamMembers,
  features,
  articles
} from '@/data/homeData';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAnimationComplete = () => {};

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchCity(city.name);
    setShowCities(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cityToSearch = selectedCity?.name || searchCity;
    if (cityToSearch.trim() !== '') {
      navigate(`/hospitals?city=${encodeURIComponent(cityToSearch.trim())}`);
    }
  };

  // For rendering icons from string names in features
  const iconMap = {
    IoTimeOutline: <IoTimeOutline />,
    IoSearchOutline: <IoSearchOutline />,
    IoCheckmarkCircleOutline: <IoCheckmarkCircleOutline />,
    IoShieldCheckmark: <IoShieldCheckmark />
  };

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section with Split Text Animation */}
      <div className="full-div flex flex-col md:flex-row w-screen h-screen bg-white">
        {/* Left Side */}
        <div className="left w-full md:w-1/2 flex flex-col items-start justify-center p-4 bg-white">
          <div className='text-div w-full text-left'>
            <SplitText
              text="Booking Made Simple,"
              className="text-5xl md:text-6xl font-bold text-[#ff8c00]"
              delay={150}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <SplitText
              text="Care Made Personal"
              className="text-5xl md:text-6xl font-bold text-center md:text-left"
              delay={150}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.4}
              rootMargin="-50px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>
          <div className='buttom mt-6 ml-2'>
            <a href="/signup">
              <button className="hover:bg-[#ff8c00] text-[#ff8c00] font-semibold hover:text-white rounded-md border-2 border-[#ff8c00] px-6 py-3 duration-200">Sign Up</button>
            </a>
          </div>
        </div>
        {/* Right Side with Looping Video */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          <video autoPlay loop muted className="w-fit h-fit object-cover">
            <source src="src/images/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Modern Search Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 py-20">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1600/400')] bg-cover opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find <span className='text-[#ff8c00] '>Hospital</span> Beds Near You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real-time availability and instant booking at your fingertips</p>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative bg-white p-6 rounded-2xl shadow-lg transform transition-all">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <IoLocationOutline className="absolute left-4 top-4 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={searchCity}
                  onChange={(e) => {
                    setSearchCity(e.target.value);
                    setShowCities(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowCities(true)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#ff8c00] focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:border-transparent text-lg"
                />
                {showCities && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {popularCities
                      .filter(city => city.name.toLowerCase().includes(searchCity.toLowerCase()))
                      .map((city, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 cursor-pointer"
                          onClick={() => handleCitySelect(city)}
                        >
                          <div className="flex items-center">
                            <IoLocationOutline className="text-[#ff8c00] mr-2" />
                            <span>{city.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{city.beds} beds available</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <button type="submit" className="bg-[#ff8c00] text-white font-semibold rounded-xl px-8 py-4 hover:bg-[#e67e00] transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                <IoSearchOutline className="mr-2 text-xl" />
                <span className="text-lg">Search Now</span>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 mr-2">Popular:</span>
              {popularCities.slice(0, 4).map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCitySelect(city)}
                  className="px-3 py-1 bg-orange-50 text-[#ff8c00] rounded-full text-sm hover:bg-orange-100 transition duration-200"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>

      {/* How It Works Section with Timeline Design */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It <span className='text-[#ff8c00] '>Works ?</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Book a hospital bed in just a few simple steps</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-20 w-1 bg-orange-100"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* ...timeline steps unchanged... */}
              {/* Step 1 */}
              <div className="md:text-right md:pr-12 relative">
                <div className=" md:block absolute right-0 top-6 w-12 h-12 rounded-full bg-[#ff8c00] text-white transform translate-x-6 flex items-center justify-center shadow-lg z-10">
                  <span className="text-xl font-bold leading-[3rem]">1</span>
                </div>
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff8c00] text-white flex items-center justify-center shadow-md">
                    <span className="text-lg font-bold ">1</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Enter Your City</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-semibold text-gray-800 mb-4">Enter Your City</h3>
                <p className="text-gray-600">Search for hospitals in your preferred location to see available beds in real-time</p>
              </div>
              <div className="md:hidden"></div>
              {/* Step 2 */}
              <div className="md:hidden"></div>
              <div className="md:text-left md:pl-12 relative">
                <div className=" md:block absolute left-0 top-6 w-12 h-12 rounded-full bg-[#ff8c00] text-white transform -translate-x-6 flex items-center justify-center shadow-lg z-10">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff8c00] text-white flex items-center justify-center shadow-md mr-4">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Browse Hospitals</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-semibold text-gray-800 mb-4">Browse Hospitals</h3>
                <p className="text-gray-600">View detailed information about available facilities, services, and patient reviews</p>
              </div>
              {/* Step 3 */}
              <div className="md:text-right md:pr-12 relative">
                <div className=" md:block absolute right-0 top-6 w-12 h-12 rounded-full bg-[#ff8c00] text-white transform translate-x-6 flex items-center justify-center shadow-lg z-10">
                  <span className="text-xl font-bold ">3</span>
                </div>
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff8c00] text-white flex items-center justify-center shadow-md mr-4">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Check Availability</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-semibold text-gray-800 mb-4">Check Availability</h3>
                <p className="text-gray-600">See real-time bed availability status with transparent pricing information</p>
              </div>
              <div className="md:hidden"></div>
              {/* Step 4 */}
              <div className="md:hidden"></div>
              <div className="md:text-left md:pl-12 relative">
                <div className=" md:block absolute left-0 top-6 w-12 h-12 rounded-full bg-[#ff8c00] text-white transform -translate-x-6 flex items-center justify-center shadow-lg z-10">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff8c00] text-white flex items-center justify-center shadow-md mr-4">
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Request Booking</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-semibold text-gray-800 mb-4">Request Booking</h3>
                <p className="text-gray-600">Submit your booking request in just a few clicks and receive instant confirmation</p>
              </div>
            </div>
            <div className="text-center mt-15">
              <button className="bg-transparent text-[#ff8c00] font-semibold rounded-xl px-8 py-3 border-2 border-[#ff8c00] hover:bg-[#ff8c00] hover:text-white transition duration-200">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Cities Section with Cards */}
      <div className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular <span className='text-[#ff8c00] '>Cities</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore hospital bed availability in these top locations</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCities.map((city, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center">
                  <IoLocationOutline className="text-white text-4xl opacity-90" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{city.name}</h3>
                  <p className="text-sm text-[#ff8c00]">{city.beds} beds available</p>
                  <a href={`/search?city=${city.name}`} className="inline-block mt-3 text-sm font-medium text-gray-600 hover:text-[#ff8c00]">
                    Explore <IoArrowForward className="inline ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why <span className='text-[#ff8c00] '>Choose</span> Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We've simplified the hospital bed booking process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} ${feature.iconColor} flex items-center justify-center mb-6 text-3xl`}>
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-10 text-white">
                <h3 className="text-3xl font-bold mb-4">Need Emergency Assistance?</h3>
                <p className="mb-6 text-amber-50">Our emergency support team is available 24/7 to help you find critical care beds.</p>
                <button className="bg-white text-[#ff8c00] font-semibold rounded-xl px-6 py-3 hover:bg-amber-50 transition duration-200 shadow-md">
                  Contact Emergency Support
                </button>
              </div>
              <div className="w-full md:w-1/2 bg-[url('/api/placeholder/800/400')] bg-cover bg-center min-h-64"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our <span className='text-[#ff8c00] '>Users</span> Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real experiences from people who found care quickly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-md p-8 relative hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-bl-2xl rounded-tr-2xl flex items-center justify-center shadow-sm">
                  <div className="text-yellow-400 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <IoStarOutline key={i} className="text-xl fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-lg italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 mr-4 border-2 border-amber-200">
                    <img
                      src={testimonial.image || "/api/placeholder/100/100"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Commitment Section */}
      <div className="py-20 bg-gradient-to-br from-[#ff8c00] to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
            <IoMedical className="text-4xl" />
          </div>
          <h2 className="text-4xl font-bold mb-8">Our Commitment to Care</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-amber-50">
            We believe everyone deserves access to quality healthcare without unnecessary delays.
            Our mission is to bridge the gap between patients and healthcare providers, making
            hospital bed booking as seamless and stress-free as possible.
          </p>
          <a href="/about" className="inline-block bg-white text-[#ff8c00] font-semibold rounded-xl px-8 py-4 hover:bg-amber-50 transition duration-200 shadow-lg">
            Learn More About Us
          </a>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">Latest <span className='text-[#ff8c00] '>Healthcare</span> Insights</h2>
            <a href="/blog" className="text-[#ff8c00] font-medium hover:underline flex items-center text-lg">
              View all articles
              <IoArrowForward className="ml-2" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-r from-orange-100/80 to-amber-100/80 relative">
                  <div className="absolute inset-0 bg-[url('/api/placeholder/800/400')] opacity-30"></div>
                  <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#ff8c00]">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a href={`/blog/article-${idx}`} className="text-[#ff8c00] font-medium hover:underline flex items-center">
                    Read More
                    <IoArrowForward className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-xl font-medium text-gray-600 mb-2">Who We Are</h3>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet our <span className="text-[#ff8c00]">team</span></h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Just take a look - each member of the team is watching your every gesture and will hear your every whisper.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden p-6 relative">
                <div className={`absolute inset-0 ${member.bgColor} opacity-10 z-0`}></div>
                <div className="relative z-10">
                  <div className="w-64 h-64 mx-auto mb-6 relative">
                    <div className={`absolute -inset-4 ${member.bgColor} rounded-full opacity-70 -z-10`}></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-center mb-6">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-[#ff8c00] transition-colors">
                      <IoMailOutline />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-[#ff8c00] transition-colors">
                      <IoLogoLinkedin />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-[#ff8c00] transition-colors">
                      <IoLogoGithub />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-[#ff8c00] transition-colors">
                      <IoLogoInstagram />
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

export default Home;