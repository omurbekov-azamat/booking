import React from 'react';
import { Box, CardMedia, Grid, Link, Rating, Typography } from '@mui/material';
import { Hotel } from '../../../types';
import { apiURL } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  hotel: Hotel;
  commentAmount?: number;
}

const HotelCardLarge: React.FC<Props> = ({ hotel, commentAmount }) => {
  const cardImage = apiURL + '/' + hotel.image;
  const { t } = useTranslation();

  let status = {
    border: '2px solid silver',
    borderRadius: '6px',
    padding: '7px',
  };

  if (hotel.status === 'premium') {
    status = {
      ...status,
      border: '2px solid gold',
    };
  } else if (hotel.status === 'business') {
    status = {
      ...status,
      border: '2px solid blue',
    };
  }

  return (
    <>
      <Grid
        container
        style={{ border: '1px solid grey', padding: '15px', marginBottom: '10px', position: 'relative' }}
        gap={2}
      >
        <Grid item style={{ maxWidth: '200px', maxHeight: '200px' }}>
          <CardMedia component="img" width="100%" height="auto" image={cardImage} alt={hotel.name} />
        </Grid>

        <Grid item>
          <Grid container flexDirection="row" justifyContent="space-between">
            <Grid container gap={1} alignItems="center">
              <Grid item>
                <Typography variant="h5" align="center">
                  {hotel.name}
                </Typography>
              </Grid>
              <Grid item>
                <Rating name="read-only" value={hotel.star} precision={0.5} readOnly size="small" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container gap={1} alignItems="center">
              <Grid item>
                <Typography variant="h6" align="center">
                  {hotel.city}
                </Typography>
              </Grid>

              <Grid item>
                <Typography color={'grey'}>{t('lowestPrice') + ' ' + hotel.lowestPrice.dollar + ' USD'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography color={'grey'}>{t('founding') + ' ' + hotel.founding}</Typography>
          </Grid>
        </Grid>

        <Grid item style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Box style={status}>{hotel.status}</Box>
        </Grid>

        <Grid item style={{ position: 'absolute', top: '55px', right: '10px' }}>
          <Link style={{ textDecoration: 'none' }} component={RouterLink} to="/login" variant="body2">
            {commentAmount + ' ' + t('comments')}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelCardLarge;
