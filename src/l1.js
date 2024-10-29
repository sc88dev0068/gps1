import React, { useState } from 'react';
import './App.css'; // Import custom CSS for styling

function App() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    setError(''); // Clear any previous error
                },
                (err) => {
                    setError(err.message);
                    setLocation(null);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="app">
            <h1>GPS Location Fetcher</h1>
            <button onClick={getLocation} className="fetch-button">
                Get My Location
            </button>
            {location && (
                <div className="location-info">
                    <p>You are here:</p>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default App;
