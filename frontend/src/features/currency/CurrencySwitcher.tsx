import React from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeCurrency, selectCurrency } from './currencySlice';

const CurrencySwitcher = () => {
  const dispatch = useAppDispatch();
  const currentCurrency = useAppSelector(selectCurrency);

  const handleChange = async (event: SelectChangeEvent) => {
    dispatch(changeCurrency(event.target.value));
  };
  return (
    <>
      <FormControl variant="standard" color={'secondary'}>
        <Select
          value={currentCurrency}
          onChange={handleChange}
          sx={{
            marginLeft: '10px',
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: 'white !important',
            },
          }}
        >
          <MenuItem value="kgs">KGS</MenuItem>
          <MenuItem value="usd">USD</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default CurrencySwitcher;
