import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Grid, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { apiURL, placeHolderImg } from '../../../constants';
import type { Hotel } from '../../../types';
import Parking from '../../../components/Icons/HotelIcons/Parking';
import PetFriendly from '../../../components/Icons/HotelIcons/PetFriendly';
import Pool from '../../../components/Icons/HotelIcons/Pool';
import Smoking from '../../../components/Icons/HotelIcons/Smoking';
import ApartmentsTable from '../../apartments/components/ApartmentsTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectCurrency } from '../../currency/currencySlice';
import PlaceIcon from '@mui/icons-material/Place';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Comments from '../../comments/Comments';

interface Props {
  hotel: Hotel;
}

const HotelFull: React.FC<Props> = ({ hotel }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { id } = useParams() as { id: string };
  const user = useAppSelector(selectUser);
  const cardImage = apiURL + '/' + hotel.image;
  const currency = useAppSelector(selectCurrency);

  let city;
  let type;

  switch (hotel.type) {
    case 'guestHouse':
      type = t('guestHouse');
      break;
    case 'pension':
      type = t('pension');
      break;
    case 'hostel':
      type = t('hostel');
      break;
    case 'hotel':
      type = t('hotel');
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
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={6} order={{ xs: 2, md: 1 }}>
              <Typography variant="h4" textAlign={'center'} fontWeight={'bolder'}>
                {hotel.name}
              </Typography>
              <Box textAlign={'center'}>
                <Rating name="read-only" value={hotel.star} precision={0.5} readOnly />
              </Box>
              <Typography variant="subtitle2" textAlign={'center'} color={'grey'}>
                {t('founding') + ' ' + hotel.founding}
              </Typography>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlaceIcon />
                {city}
              </Typography>
              <Typography component="p" textAlign={'center'}>
                {i18n.language === 'ru' ? hotel?.address.adrRu : hotel?.address.adrEn}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between" alignItems={'center'}>
                <Grid item>
                  <Typography component="p" textAlign={'center'}>
                    {type}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p">
                    {t('lowestPrice') + ': '}
                    <strong>
                      {currency === 'kgs' ? hotel?.lowestPrice.som + ' KGS' : hotel?.lowestPrice.dollar + ' USD'}
                    </strong>
                  </Typography>
                </Grid>
              </Grid>
              <Typography sx={{ my: 2 }} component="p">
                {t('extraServices')}
              </Typography>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} md={6} xl={3}>
                  <Parking parking={hotel.parking} />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <PetFriendly petFriendly={hotel.petFriendly} />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <Pool pool={hotel.swimmingPool} />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <Smoking noSmoking={hotel.nonSmokingRooms} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} xl={6} order={{ xs: 1, md: 2 }}>
              <Box display="flex" justifyContent="center">
                <LazyLoadImage
                  alt={hotel.name}
                  effect="blur"
                  style={{
                    minWidth: '300px',
                    width: '100%',
                    objectFit: 'cover',
                    maxHeight: '100%',
                    borderRadius: '20px',
                  }}
                  src={cardImage}
                  placeholderSrc={placeHolderImg}
                />
              </Box>
            </Grid>
          </Grid>
          <Typography component="p" sx={{ mt: 4, color: '#4d4949' }}>
            {i18n.language === 'ru' ? hotel?.description.ru : hotel?.description.en}
          </Typography>
        </CardContent>
      </Card>
      {(user?.role === 'admin' || user?._id === hotel.userId) && (
        <Button
          variant="contained"
          color="success"
          size="small"
          style={{ margin: '10px auto', display: 'block', background: '#03C988' }}
          onClick={() => navigate('/hotels/' + id + '/createApartment')}
        >
          {t('createRoom')}
        </Button>
      )}
      <ApartmentsTable hotel={hotel} />
      <Comments />
    </>
  );
};

export default HotelFull;
