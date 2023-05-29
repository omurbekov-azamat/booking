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

  const { id } = useParams() as {
    id: string;
  };

  useEffect(() => {
    dispatch(fetchOneApartment(id));
    dispatch(fetchApartments({ hotelId: apartment?.hotelId._id }));
  }, [dispatch, id, apartment?.hotelId._id]);

  const onClickResolveApartment = () => {
    navigate(`/book-apartment/${apartment?.hotelId.name}/${apartment?.hotelId._id}/apartment/${id}`);
  };

  return (
    <>
      {loadingFetchOneApartment && <Spinner />}
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Grid container alignItems="start">
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Grid container gap={2} flexDirection="column">
                <Typography variant="h4" component="p">
                  {apartment?.hotelId.name}
                </Typography>
                <Typography variant="h5" component="p">
                  {i18n.language === 'en' ? apartment?.roomTypeId.name.en : apartment?.roomTypeId.name.ru}
                </Typography>
                <Typography gutterBottom component="p">
                  {t('price') +
                    ': ' +
                    (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
                </Typography>
                <Typography gutterBottom component="p">
                  {t('place') + ': ' + apartment?.place + ' M²'}
                </Typography>
                <Typography gutterBottom component="p">
                  {i18n.language === 'en' ? apartment?.description.en : apartment?.description.ru}
                </Typography>
              </Grid>
              <Grid item gap={2} flexDirection="column">
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
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} alignSelf="center">
              {apartment && <ApartmentsGallery apartmentData={apartment} />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Apartment;
