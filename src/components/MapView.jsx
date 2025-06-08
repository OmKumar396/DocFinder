// src/components/MapView.jsx
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api'; // Remove LoadScript import

const containerStyle = {
  width: '100%',
  height: '100%',
};

// googleMapsLibraries constant is no longer needed here if only used in App.jsx

const MapView = ({ center, zoom, hospitals = [], selectedHospital = null }) => {
  return (
    // REMOVE LoadScript wrapper here
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
      }}
    >
      {/* Render markers for each hospital */}
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.place_id || hospital.name}
          position={{ lat: hospital.latitude, lng: hospital.longitude }}
          icon={selectedHospital && selectedHospital.place_id === hospital.place_id ?
            {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue for selected
              scaledSize: new window.google.maps.Size(40, 40)
            } :
            {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red for others
              scaledSize: new window.google.maps.Size(30, 30)
            }
          }
          title={hospital.name}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;