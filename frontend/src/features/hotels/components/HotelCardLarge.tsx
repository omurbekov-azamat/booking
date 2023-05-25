import React from 'react';
import { CardMedia, Checkbox, Grid, Link, Rating, Typography } from '@mui/material';
import { Hotel } from '../../../types';
import { apiURL } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import premium from '../../../assets/images/premium.png';
import business from '../../../assets/images/business.png';
import standard from '../../../assets/images/standard.png';

interface Props {
  hotel: Hotel;
  commentAmount?: number;
}

const HotelCardLarge: React.FC<Props> = ({ hotel, commentAmount }) => {
  const cardImage = apiURL + '/' + hotel.image;
  const currency = useAppSelector(selectCurrency);
  const { t } = useTranslation();
  let status;
  let statusIcon;
  let city;

  switch (hotel.status) {
    case 'premium':
      status = t('premium');
      statusIcon = premium;
      break;
    case 'business':
      status = t('business');
      statusIcon = business;
      break;
    case 'standard':
      status = t('standard');
      statusIcon = standard;
      break;
    default:
      break;
  }

  switch (hotel.city) {
    case 'bishkek':
      city = t('bishkek');
      break;
    case 'issykKul':
      city = t('issykKul');
      break;
    case 'osh':
      city = t('osh');
      break;
    case 'kara-balta':
      city = t('kara-balta');
      break;
    case 'tokmok':
      city = t('tokmok');
      break;
    case 'kant':
      city = t('kant');
      break;
    case 'talas':
      city = t('talas');
      break;
    case 'kara-suu':
      city = t('kara-suu');
      break;
    case 'nookat':
      city = t('nookat');
      break;
    case 'uzgen':
      city = t('uzgen');
      break;
    case 'suzak':
      city = t('suzak');
      break;
    case 'kara-kulja':
      city = t('kara-kulja');
      break;
    case 'naryn':
      city = t('naryn');
      break;
    case 'atbashi':
      city = t('atbashi');
      break;
    case 'kochkor':
      city = t('kochkor');
      break;
    case 'isfana':
      city = t('isfana');
      break;
    case 'kyzyl-kiya':
      city = t('kyzyl-kiya');
      break;
    case 'leylek':
      city = t('leylek');
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
                {t('lowestPrice') +
                  ' ' +
                  (currency === 'kgs' ? hotel.lowestPrice.som + ' KGS' : hotel.lowestPrice.dollar + ' USD')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container flexDirection="column" alignItems="center">
            <Grid item style={{ width: 35, height: 35, padding: 0 }}>
              <img src={statusIcon} alt={status} style={{ width: '100%', height: 'auto' }} />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 16 }}>{status}</Typography>
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
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} color="error" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelCardLarge;
