import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  width?: number;
}

const SelectCities: React.FC<Props> = ({ onChange, name, label, width }) => {
  const { t } = useTranslation();

  const [cityName, setCityName] = useState('');

  const cities = [
    { id: 'bishkek', title: t('bishkek') },
    { id: 'issyk kul', title: t('issykKul') },
    { id: 'osh', title: t('osh') },
  ];

  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    onChange(e);
  };

  return (
    <TextField select label={label} value={cityName} name={name} onChange={selectChangeHandler} sx={{ width }}>
      {cities.map((city) => (
        <MenuItem key={city.id} value={city.id}>
          {city.title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectCities;
