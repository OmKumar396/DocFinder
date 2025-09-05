import { useState, useEffect, useRef } from "react";

const DEFAULT_CENTER = { lat: 20.2961, lng: 85.8245 };

export default function useGoogleMapsHospitalSearch(isGoogleMapsLoaded, initialCity) {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [mapState, setMapState] = useState({ center: DEFAULT_CENTER, zoom: 12 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const placesService = useRef(null);
  const geocoder = useRef(null);

  useEffect(() => {
    if (isGoogleMapsLoaded && window.google && window.google.maps && window.google.maps.places) {
      if (!placesService.current) {
        placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
      }
      if (!geocoder.current) {
        geocoder.current = new window.google.maps.Geocoder();
      }
    }
  }, [isGoogleMapsLoaded]);

  useEffect(() => {
    if (initialCity && isGoogleMapsLoaded && placesService.current && geocoder.current) {
      handleSearch(null, initialCity);
    }
    // eslint-disable-next-line
  }, [initialCity, isGoogleMapsLoaded]);

  const handleSearch = (event, cityToSearch) => {
    event && event.preventDefault();
    if (!cityToSearch || !cityToSearch.trim()) {
      setError("Please enter a city name.");
      setHospitals([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    setHospitals([]);
    if (!isGoogleMapsLoaded || !geocoder.current || !placesService.current) {
      setError("Google Maps services not fully loaded yet. Please try again.");
      setIsLoading(false);
      return;
    }
    geocoder.current.geocode({ 'address': cityToSearch + ", India" }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const cityLocation = results[0].geometry.location;
        setMapState({ center: { lat: cityLocation.lat(), lng: cityLocation.lng() }, zoom: 12 });
        const request = {
          location: cityLocation,
          radius: '5000',
          type: ['hospital'],
          keyword: 'hospital',
        };
        placesService.current.nearbySearch(request, (results, status) => {
          setIsLoading(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const foundHospitals = results.map(place => ({
              name: place.name,
              address: place.vicinity,
              city: cityToSearch,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              phone: place.international_phone_number || 'N/A',
              place_id: place.place_id,
            }));
            setHospitals(foundHospitals);
            if (foundHospitals.length === 0) setError(`No hospitals found in ${cityToSearch}.`);
          } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setHospitals([]);
            setError(`No hospitals found in ${cityToSearch}.`);
          } else {
            setError(`Error searching for hospitals: ${status}.`);
          }
        });
      } else {
        setIsLoading(false);
        setError(`Could not find location for "${cityToSearch}": ${status}.`);
      }
    });
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setMapState({ center: { lat: hospital.latitude, lng: hospital.longitude }, zoom: 15 });
  };

  return {
    hospitals,
    selectedHospital,
    mapState,
    isLoading,
    error,
    handleSearch,
    handleHospitalClick,
  };
}