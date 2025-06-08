import React from 'react';
import { useInView } from 'react-intersection-observer';
import { aboutContent } from '@/data/aboutData';

const About = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: missionVisionRef, inView: missionVisionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: illuRef, inView: illuInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 font-inter overflow-hidden">
      {/* Main Container */}
      <div className="w-full max-w-screen-xl bg-orange-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Text Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div
            ref={aboutRef}
            className={`transition-all duration-1000 ease-out ${
              aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-6 leading-tight">
              {aboutContent.title.split('DocFinder')[0]}
              <span className="text-orange-600">DocFinder</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {aboutContent.description1}
            </p>
            <p className="text-md text-gray-600 mb-8">
              {aboutContent.description2}
            </p>
          </div>

          {/* Mission/Vision Section */}
          <div
            ref={missionVisionRef}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 transition-all duration-1000 ease-out delay-200 ${
              missionVisionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-orange-600 mb-2">Our Mission</h3>
              <p className="text-gray-700">
                {aboutContent.mission}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-orange-600 mb-2">Our Vision</h3>
              <p className="text-gray-700">
                {aboutContent.vision}
              </p>
            </div>
          </div>
        </div>

        {/* Illustration Section */}
        <div
          ref={illuRef}
          className={`w-full md:w-1/2 bg-gradient-to-tr from-[#febd76] to-[#ff8c00] flex flex-col justify-center items-center p-8 md:p-12 text-center text-white transition-all duration-1000 ease-out ${
            illuInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <img
            src='src/images/About.png'
            alt="About Us Illustration"
            className="w-cover h-120 "
          />
          <h2 className="text-3xl font-bold mb-3">{aboutContent.illuTitle}</h2>
          <p className="text-lg mb-8 opacity-90">
            {aboutContent.illuText}
          </p>
          <div className='dots flex justify-center items-center gap-x-3'>
            <div className='dot w-2.5 h-2.5 bg-white rounded-full block opacity-70'></div>
            <div className='dot w-2.5 h-2.5 bg-white rounded-full block opacity-70'></div>
            <div className='dot w-2.5 h-2.5 bg-white rounded-full block opacity-70'></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;