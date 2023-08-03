import React, { useState } from 'react';
import {
  GoogleMap, Marker, LoadScript,
} from '@react-google-maps/api';
import AutocompleteWrapper from './AutocompleteWrapper';
import home from '../assets/HomeIndicator.svg';
import top from '../assets/StatusBar.svg';
import './NavBar.scss';

export const NavBar: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const apiKey = 'AIzaSyAYd6GORf3u4BNL9OSI4QaYaRGQVLsOYfU';

  const center = { lat: 48.8584, lng: 2.2945 };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']} loadingElement={<div>Loading...</div>}>
      <div className="starter">
        <img src={top} alt="StatusBar" />
        <button type="button" onClick={() => map?.panTo(center)}>Home</button>
        <AutocompleteWrapper placeholder="Start" />
        <AutocompleteWrapper placeholder="End" />
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

    </LoadScript>
  );
};
