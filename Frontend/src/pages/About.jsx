import React from 'react';
import { useInView } from 'react-intersection-observer';
import { aboutContent } from '@/data/aboutData';
import { IoRocketOutline, IoEyeOutline } from 'react-icons/io5'; // Icons for Mission & Vision

const About = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: missionVisionRef, inView: missionVisionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: illuRef, inView: illuInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* --- Text Content Section (Left) --- */}
        <div className="flex flex-col justify-center">
          <div
            ref={aboutRef}
            className={`transition-all duration-1000 ease-out ${
              aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight">
              {aboutContent.title.split('DocFinder')[0]}
              <span className="text-indigo-600">DocFinder</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {aboutContent.description1}
            </p>
            <p className="text-lg text-gray-600">
              {aboutContent.description2}
            </p>
          </div>

          {/* Mission/Vision Section */}
          <div
            ref={missionVisionRef}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 transition-all duration-1000 ease-out delay-200 ${
              missionVisionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-3">
                <IoRocketOutline className="text-3xl text-indigo-500" />
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                {aboutContent.mission}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-3">
                <IoEyeOutline className="text-3xl text-indigo-500" />
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                {aboutContent.vision}
              </p>
            </div>
          </div>
        </div>

        {/* --- Illustration Section (Right) --- */}
        <div
          ref={illuRef}
          className={`w-full h-[600px] bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl flex flex-col justify-center items-center p-8 md:p-12 text-center text-white transition-all duration-1000 ease-out ${
            illuInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src='src/images/About.png'
            alt="About Us Illustration"
            className="w-full max-w-sm"
          />
          <h2 className="text-4xl font-bold mt-8">{aboutContent.illuTitle}</h2>
          <p className="text-lg mt-4 max-w-md opacity-90">
            {aboutContent.illuText}
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;