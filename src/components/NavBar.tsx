import React, { useState } from 'react';
import {
  useJsApiLoader, GoogleMap, Marker, Autocomplete,
} from '@react-google-maps/api';
import home from '../assets/HomeIndicator.svg';
import top from '../assets/StatusBar.svg';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const apiKey = process.env.Key ?? '';

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'], // Додали 'places' до бібліотек
  });

  if (!isLoaded) {
    // eslint-disable-next-line no-console
    console.log('Error');
  }

  const center = { lat: 48.8584, lng: 2.2945 };

  return (
    <div className="starter">
      <img src={top} alt="StatusBar" />
      <button type="button" onClick={() => map?.panTo(center)}>Home</button>
      {' '}
      {/* Змінили maps на map */}
      <Autocomplete>
        <input type="text" placeholder="Start" />
      </Autocomplete>
      <Autocomplete>
        <input type="text" placeholder="End" />
      </Autocomplete>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onLoad={maps => setMap(maps)}
      >
        <Marker position={center} />
        {}
      </GoogleMap>
      <div className="img-container">
        <img src={home} alt="Home" />
      </div>
    </div>
  );
};
