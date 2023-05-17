import React, { MouseEventHandler } from 'react';
import { CardMedia, Grid, Rating, Typography } from '@mui/material';
import { Hotel } from '../../../types';
import { apiURL } from '../../../constants';

interface Props {
  hotel: Hotel;
}

const HotelCardLarge: React.FC<Props> = ({ hotel }) => {
  const cardImage = apiURL + '/' + hotel.image;

  return (
    <>
      <Grid container style={{ border: '1px solid grey', padding: '15px', marginBottom: '10px' }} gap={2}>
        <Grid item style={{ maxWidth: '200px', maxHeight: '200px' }}>
          <CardMedia component="img" width="100%" height="auto" image={cardImage} alt={hotel.name} />
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" gap={1} alignItems="center">
            <Grid item>
              <Typography gutterBottom variant="h5" align="center">
                {hotel.name}
              </Typography>
            </Grid>
            <Grid item>
              <Rating name="read-only" value={hotel.star} precision={0.5} readOnly size="small" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelCardLarge;
