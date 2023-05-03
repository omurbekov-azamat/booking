import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  width?: number;
  value: string;
}

const SelectCities: React.FC<Props> = ({ onChange, name, label, width, value }) => {
  const { t } = useTranslation();

  const cities = [
    { id: 'bishkek', title: t('bishkek') },
    { id: 'issykKul', title: t('issykKul') },
    { id: 'osh', title: t('osh') },
  ];

  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <TextField select label={label} value={value} name={name} onChange={selectChangeHandler} sx={{ width }} required>
      {cities.map((city) => (
        <MenuItem key={city.id} value={city.id}>
          {city.title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCities;
