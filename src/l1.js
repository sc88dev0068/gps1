import React, { useState, useEffect } from 'react';

const RealTimeLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false); // New state to track if location is fetched

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    const updateLocation = (position) => {
      console.log("Location updated:", position.coords);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocationFetched(true); // Mark location as fetched
      setError(null); // Clear any previous error
    };

    const handleError = (error) => {
      if (!locationFetched) { // Only set error if location hasn't been fetched yet
        console.error("Error fetching location:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Permission denied. Please enable location access.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Position unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError(`An unknown error occurred: ${error.message}`);
            break;
        }
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      updateLocation,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 20000, // Longer timeout for continuous tracking
        maximumAge: 10000, // Use cached data up to 10 seconds old
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [locationFetched]);

  return (
    <div>
      <h1>Real-Time GPS Tracking</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>Fetching location data...</p>
      )}
    </div>
  );
};

export default RealTimeLocation;
