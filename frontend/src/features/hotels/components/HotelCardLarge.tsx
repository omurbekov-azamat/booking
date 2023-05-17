import React, { MouseEventHandler } from 'react';
import { Box, CardMedia, Checkbox, Grid, Link, Rating, Typography } from '@mui/material';
import { Hotel } from '../../../types';
import { apiURL } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface Props {
  hotel: Hotel;
  commentAmount?: number;
  onFavoriteIconClick?: MouseEventHandler;
}

const HotelCardLarge: React.FC<Props> = ({ hotel, commentAmount, onFavoriteIconClick }) => {
  const cardImage = apiURL + '/' + hotel.image;
  const { t } = useTranslation();

  let statusStyle = {
    border: '4px solid silver',
    borderRadius: '6px',
    padding: '7px',
    fontWeight: 'bold',
  };

  if (hotel.status === 'premium') {
    statusStyle = {
      ...statusStyle,
      border: '2px solid gold',
    };
  } else if (hotel.status === 'business') {
    statusStyle = {
      ...statusStyle,
      border: '2px solid blue',
    };
  }

  let status = '';

  switch (hotel.status) {
    case 'premium':
      status = t('premium');
      break;
    case 'business':
      status = t('business');
      break;
    case 'standard':
      status = t('standard');
      break;
    default:
      break;
  }

  let city = '';

  switch (hotel.city) {
    case 'bishkek':
      city = t('bishkek');
      break;
    case 'issykKul':
      city = t('issykKul');
      break;
    case 'osh':
      status = t('osh');
      break;
    case 'kara-balta':
      status = t('kara-balta');
      break;
    case 'tokmok':
      status = t('tokmok');
      break;
    case 'kant':
      status = t('kant');
      break;
    case 'talas':
      status = t('talas');
      break;
    case 'kara-suu':
      status = t('kara-suu');
      break;
    case 'nookat':
      status = t('nookat');
      break;
    case 'uzgen':
      status = t('uzgen');
      break;
    case 'suzak':
      status = t('suzak');
      break;
    case 'kara-kulja':
      status = t('kara-kulja');
      break;
    case 'naryn':
      status = t('naryn');
      break;
    case 'atbashi':
      status = t('atbashi');
      break;
    case 'kochkor':
      status = t('kochkor');
      break;
    case 'isfana':
      status = t('isfana');
      break;
    case 'kyzyl-kiya':
      status = t('kyzyl-kiya');
      break;
    case 'leylek':
      status = t('leylek');
      break;
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

        <Grid item flex={1}>
          <Grid container flexDirection="row" justifyContent="space-between">
            <Grid container gap={1} alignItems="center">
              <Grid item>
                <Typography variant="h5" fontWeight="bolder">
                  {hotel.name}
                </Typography>
              </Grid>
              <Grid item>
                <Rating name="read-only" value={hotel.star} precision={0.5} readOnly size="small" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item>
              <Typography variant="h6">{city}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'grey'} fontSize={18}>
                {t('founding') + ' ' + hotel.founding}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={'grey'} fontSize={18}>
                {t('lowestPrice') + ' ' + hotel.lowestPrice.dollar + ' USD'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container flexDirection="column" alignItems="center">
            <Grid item>
              <Box style={statusStyle} textAlign={'center'}>
                {status}
              </Box>
            </Grid>

            <Grid item>
              <Link
                style={{ textDecoration: 'none', color: '#6b6b6b' }}
                component={RouterLink}
                to={'/hotel/' + hotel._id + '/comments'}
                variant="body2"
              >
                {t('comments') + ': ' + commentAmount}
              </Link>
            </Grid>
            <Grid item>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onClick={onFavoriteIconClick}
                color="error"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelCardLarge;
