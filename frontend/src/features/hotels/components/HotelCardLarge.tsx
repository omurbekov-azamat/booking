import React from 'react';
import { CardMedia, Grid } from '@mui/material';
import { Hotel } from '../../../types';
import { apiURL } from '../../../constants';

interface Props {
  hotel: Hotel;
}

const HotelCardLarge: React.FC<Props> = ({ hotel }) => {
  const cardImage = apiURL + '/' + hotel.image;

  return (
    <>
      <Grid container style={{ border: '1px solid grey', padding: '15px', marginBottom: '10px' }}>
        <Grid item style={{ maxWidth: '200px', maxHeight: '200px' }}>
          <CardMedia component="img" width="100%" height="auto" image={cardImage} alt={hotel.name} />
        </Grid>
      </Grid>
    </>
  );
};

export default HotelCardLarge;
