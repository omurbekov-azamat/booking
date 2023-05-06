import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { cities } from '../../../constants';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  width?: number;
  value: string;
}

const SelectCities: React.FC<Props> = ({ onChange, name, label, width, value }) => {
  const { t } = useTranslation();
  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <TextField select label={label} value={value} name={name} onChange={selectChangeHandler} sx={{ width }} required>
      {cities.map((city) => (
        <MenuItem key={city} value={city}>
          {t(city)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCities;
