import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import top from '../assets/StatusBar.svg';
import './NavBar.scss';

interface NavBarProps {
  map: google.maps.Map | null;
  setDirectionsResponse: any;
}

const NavBar: React.FC<NavBarProps> = ({ map, setDirectionsResponse }) => {
  const center = { lat: 48.8584, lng: 2.2945 };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [distance, setDistance] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duration, setDuration] = useState<string>('');

  const destiantionRef = useRef<HTMLInputElement>(null);
  const originRef = useRef<HTMLInputElement>(null);

  const calculateRoute = async () => {
    if (!originRef.current?.value || !destiantionRef.current?.value) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const request: google.maps.DirectionsRequest = {
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    try {
      const results = await directionsService.route(request);

      if (results) {
        setDirectionsResponse(results);
        setDistance(results.routes[0]?.legs[0]?.distance?.text || '');
        setDuration(results.routes[0]?.legs[0]?.duration?.text || '');
      }
    } catch (error) {
      // Handle the error
    }
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) {
      originRef.current.value = '';
    }

    if (destiantionRef.current) {
      destiantionRef.current.value = '';
    }
  };

  return (
    <div className="navbar">
      <img src={top} alt="StatusBar" />
      <div className="container">
        <div className="controls">
          <button
            type="button"
            className="button button--home"
            onClick={() => map?.panTo(center)}
          >
            Home
          </button>
          <button
            type="button"
            className="button button--calculate"
            onClick={calculateRoute}
          >
            Calculate
          </button>
          <button
            type="button"
            className="button button--clear"
            onClick={clearRoute}
          >
            Clear
          </button>
        </div>
        <div className="input-group">
          <div className="autocomplete">
            <Autocomplete>
              <input
                className="input input--start"
                type="text"
                placeholder="Start"
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div className="autocomplete">
            <Autocomplete>
              <input
                className="input input--end"
                type="text"
                placeholder="End"
                ref={destiantionRef}
              />
            </Autocomplete>
          </div>
        </div>
        <div className="results">
          <div className="small-input">
            <span className="input-label">Distance:</span>
            <input
              className="input input--distance"
              type="text"
              value={distance}
            />
          </div>
          <div className="small-input">
            <span className="input-label">Duration:</span>
            <input
              className="input input--duration"
              type="text"
              value={duration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
