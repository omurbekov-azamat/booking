import React, { useState } from 'react';
import SelectCities from '../../../components/UI/SelecetCities/SelectCities';
import { Box } from '@mui/material';

const SearchHotelForm = () => {
  const [state, setState] = useState({
    city: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Box mt={5}>
      <SelectCities onChange={inputChangeHandler} name="city" label="Where are you going?" width={200} />
    </Box>
  );
};

export default SearchHotelForm;
