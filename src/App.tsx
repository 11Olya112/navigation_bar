import React, { useState } from 'react';
import {
  GoogleMap, Marker, LoadScript, DirectionsRenderer,
} from '@react-google-maps/api';
import NavBar from './components/NavBar';
import home from './assets/HomeIndicator.svg';
import './App.scss';

export const App: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [directionsResponse, setDirectionsResponse]
  = useState<google.maps.DirectionsResult | null>(null);

  const apiKey = 'AIzaSyAYd6GORf3u4BNL9OSI4QaYaRGQVLsOYfU';

  const center = { lat: 48.8584, lng: 2.2945 };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']} loadingElement={<div>Loading...</div>}>
      <div className="map-container">
        <NavBar
          map={map}
          setDirectionsResponse={setDirectionsResponse}
        />

        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={maps => setMap(maps)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>

        <div className="img-container">
          <img src={home} alt="Home" />
        </div>
        {' '}

      </div>
    </LoadScript>
  );
};
