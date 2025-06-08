import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { IoLocationOutline, IoCallOutline, IoSearchOutline } from 'react-icons/io5';
import MapView from "../components/MapView";
import useGoogleMapsHospitalSearch from "../hooks/useGoogleMapsHospitalSearch"; // Custom hook

const Hospital = ({ isGoogleMapsLoaded }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCity = queryParams.get('city') || '';

  const [cityInput, setCityInput] = useState(initialCity);

  // Use custom hook for all hospital/map logic
  const {
    hospitals,
    selectedHospital,
    mapState,
    isLoading,
    error,
    handleSearch,
    handleHospitalClick,
  } = useGoogleMapsHospitalSearch(isGoogleMapsLoaded, initialCity);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Hospitals</h1>
        <form onSubmit={e => handleSearch(e, cityInput)} className="mb-8 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full md:w-auto">
            <IoLocationOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Enter City Name (e.g., Bhubaneswar)"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:border-transparent text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-[#ff8c00] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#e67e00] transition duration-200 flex items-center justify-center text-lg"
          >
            <IoSearchOutline className="mr-2" /> Search
          </button>
        </form>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Hospitals</h2>
            {isLoading && <p className="text-gray-600">Searching for hospitals...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <div
                  key={hospital.place_id}
                  className={`border border-gray-200 rounded-md p-4 mb-3 cursor-pointer transition-all ${selectedHospital && selectedHospital.place_id === hospital.place_id ? 'bg-orange-100 border-orange-400 shadow-md' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handleHospitalClick(hospital)}
                >
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{hospital.name}</h3>
                  <p className="text-gray-600 text-sm mb-2"><IoLocationOutline className="inline-block mr-1 text-base" />{hospital.address}</p>
                  {hospital.phone && (
                    <p className="text-gray-600 text-sm"><IoCallOutline className="inline-block mr-1 text-base" />{hospital.phone}</p>
                  )}
                  {hospital.bedsAvailable && (
                    <p className="text-green-600 font-semibold mt-2">Beds Available: {hospital.bedsAvailable}</p>
                  )}
                </div>
              ))
            ) : (
              !isLoading && !error && (
                <div className="text-gray-500 mt-4">
                  {error ? <p>{error}</p> : (cityInput ? `No hospitals found in ${cityInput}.` : 'Enter a city to find hospitals.')}
                </div>
              )
            )}
          </div>
          <div className="lg:col-span-2 h-[500px] border border-gray-200 rounded-md overflow-hidden">
            {isGoogleMapsLoaded ? (
              <MapView
                center={mapState.center}
                zoom={mapState.zoom}
                hospitals={hospitals}
                selectedHospital={selectedHospital}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600">
                Loading Map...
              </div>
            )}
          </div>
        </div>
        {selectedHospital && (
          <div className="lg:col-span-3 mt-4 p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{selectedHospital.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 mb-1"><strong>Address:</strong></p>
                <p className="text-gray-600 mb-2">
                  {selectedHospital.address}
                </p>
                {selectedHospital.phone && (
                  <>
                    <p className="text-gray-700 mb-1"><strong>Phone:</strong></p>
                    <p className="text-gray-600 mb-2">{selectedHospital.phone}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospital;