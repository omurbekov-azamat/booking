import React, { useState } from 'react';
import { Container, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const AdminCabinet = () => {
  const [state, setState] = useState({
    myHotels: false,
    orders: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
      [e.target.name === 'myHotels' ? 'orders' : 'myHotels']: false,
    });
  };

  return (
    <>
      <Container>
        <Typography variant="h4" component="p" textAlign={'center'}>
          {'Admin cabinet'}
        </Typography>
        <RadioGroup>
          <FormControlLabel
            control={<Radio checked={state.myHotels} onChange={handleChange} name="myHotels" />}
            label="My Hotels"
          />
          <FormControlLabel
            control={<Radio checked={state.orders} onChange={handleChange} name="orders" />}
            label="Orders"
          />
        </RadioGroup>
      </Container>
    </>
  );
};

export default AdminCabinet;
