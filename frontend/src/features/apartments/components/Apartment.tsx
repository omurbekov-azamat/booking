import React, { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLoadingFetchOneApartment, selectOneApartment } from '../apartmentSlice';
import { fetchApartments, fetchOneApartment } from '../apartmentThunks';
import ApartmentsGallery from './ApartmentsGallery';
import { useTranslation } from 'react-i18next';
import { selectCurrency } from '../../currency/currencySlice';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BalconyIcon from '@mui/icons-material/Balcony';
import BathtubIcon from '@mui/icons-material/Bathtub';
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TvIcon from '@mui/icons-material/Tv';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import WifiIcon from '@mui/icons-material/Wifi';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Apartment = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const apartment = useAppSelector(selectOneApartment);
  const currency = useAppSelector(selectCurrency);
  const loadingFetchOneApartment = useAppSelector(selectLoadingFetchOneApartment);

  const { hotelName, hotelId, apartmentId } = useParams() as {
    hotelName: string;
    hotelId: string;
    apartmentId: string;
  };

  useEffect(() => {
    dispatch(fetchOneApartment(apartmentId));
    dispatch(fetchApartments({ hotelId: hotelId }));
  }, [dispatch, apartmentId, hotelId]);

  const onClickResolveApartment = () => {
    navigate(`/book-apartment/${hotelName}/${hotelId}/apartment/${apartmentId}`);
  };

  return (
    <>
      {loadingFetchOneApartment && <Spinner />}
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h4" component="p" textAlign={'center'}>
            {hotelName}
          </Typography>
          <Typography variant="h5" component="p" textAlign={'center'}>
            {i18n.language === 'en' ? apartment?.roomTypeId.name.en : apartment?.roomTypeId.name.ru}
          </Typography>
          <Typography gutterBottom component="p">
            {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
          </Typography>

          <Typography gutterBottom component="p">
            {t('place') + ': ' + apartment?.place + ' M²'}
          </Typography>

          <Grid container alignItems="center" gap={2}>
            {apartment?.AC && (
              <Grid item>
                <AcUnitIcon />
                <span>{t('AC')}</span>
              </Grid>
            )}
            {apartment?.balcony && (
              <Grid item>
                <BalconyIcon />
                <span>{t('balcony')}</span>
              </Grid>
            )}
            {apartment?.bath && (
              <Grid item>
                <BathtubIcon />
                <span>{t('bath')}</span>
              </Grid>
            )}
            {apartment?.petFriendly && (
              <Grid item>
                <PetsIcon />
                <span>{t('petFriendly')}</span>
              </Grid>
            )}
            {apartment?.food && (
              <Grid item>
                <RestaurantIcon />
                <span>{t('food')}</span>
              </Grid>
            )}
            {apartment?.tv && (
              <Grid item>
                <TvIcon />
                <span>{t('tv')}</span>
              </Grid>
            )}
            {apartment?.towel && (
              <Grid item>
                <DryCleaningIcon />
                <span>{t('towel')}</span>
              </Grid>
            )}
            {apartment?.wifi && (
              <Grid item>
                <WifiIcon />
                <span>{t('wiFi')}</span>
              </Grid>
            )}
          </Grid>

          <Typography gutterBottom component="p" sx={{ mt: 2 }}>
            {i18n.language === 'en' ? apartment?.description.en : apartment?.description.ru}
          </Typography>
        </CardContent>
        {apartment && <ApartmentsGallery apartmentData={apartment} />}
      </Card>

      <Box textAlign="right">
        <Button
          variant="outlined"
          size={'large'}
          sx={{ mx: 'auto', my: 3, display: 'block' }}
          onClick={onClickResolveApartment}
        >
          {t('reserve')}
        </Button>
      </Box>
    </>
  );
};

export default Apartment;
