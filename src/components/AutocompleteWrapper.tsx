import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

interface AutocompleteWrapperProps {
  placeholder: string;
}

const AutocompleteWrapper: React.FC<AutocompleteWrapperProps> = ({ placeholder }) => {
  return (
    <Autocomplete>
      <input type="text" placeholder={placeholder} />
    </Autocomplete>
  );
};

export default AutocompleteWrapper;
