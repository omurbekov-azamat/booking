import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
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
import CurveIcon from '../../../components/UI/CurveIcon/CurveIcon';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';

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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} order={{ xs: 2, md: 1 }}>
          <Grid container gap={3} flexDirection="column">
            {apartment?.roomTypeId ? (
              <Typography variant="h5" textTransform="capitalize" fontWeight="bold">
                {i18n.language === 'en' ? apartment?.roomTypeId.name.en : apartment?.roomTypeId.name.ru}
              </Typography>
            ) : (
              ''
            )}
            <Grid container direction="row" spacing={1} maxWidth={500}>
              {apartment?.AC && <CurveIcon icon={<AcUnitIcon />} text="AC" />}
              {apartment?.balcony && <CurveIcon icon={<BalconyIcon />} text="balcony" />}
              {apartment?.bath && <CurveIcon icon={<BathtubIcon />} text="bath" />}
              {apartment?.petFriendly && <CurveIcon icon={<PetsIcon />} text="petFriendly" />}
              {apartment?.food && <CurveIcon icon={<RestaurantIcon />} text="food" />}
              {apartment?.tv && <CurveIcon icon={<TvIcon />} text="tv" />}
              {apartment?.towel && <CurveIcon icon={<DryCleaningIcon />} text="towel" />}
              {apartment?.wifi && <CurveIcon icon={<WifiIcon />} text="wiFi" />}
              {apartment?.place && <CurveIcon icon={<TabUnselectedIcon />} text={`${apartment.place}  M²`} />}
            </Grid>
            <Typography textTransform="capitalize" fontWeight="bold">
              {t('place') + ': ' + apartment?.place + ' M²'}
            </Typography>
            <Typography component="p">
              {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
            </Typography>
            <Typography component="p">
              {i18n.language === 'en' ? apartment?.description.en : apartment?.description.ru}
            </Typography>
          </Grid>
          <Box textAlign="right">
            <Button
              variant="outlined"
              size="small"
              sx={{ mx: 'auto', my: 3, display: 'block' }}
              onClick={onClickResolveApartment}
            >
              {t('reserve')}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} alignSelf="center" order={{ xs: 1, md: 2 }}>
          {apartment?.roomTypeId && <ApartmentsGallery apartmentData={apartment} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Apartment;
