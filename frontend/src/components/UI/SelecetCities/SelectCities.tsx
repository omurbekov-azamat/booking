import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { CITIES } from '../../../constants';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  width: number;
}

const SelectCities: React.FC<Props> = ({ onChange, name, label, width }) => {
  const [cityName, setCityName] = useState('');

  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    onChange(e);
  };

  return (
    <TextField select label={label} name={name} value={cityName} onChange={selectChangeHandler} sx={{ width }}>
      {CITIES.map((city) => (
        <MenuItem key={city.id} value={city.id}>
          {city.title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCities;
