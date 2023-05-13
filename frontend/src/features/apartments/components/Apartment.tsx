import React, { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box, Button, Grid } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchOneApartment } from '../apartmentThunks';
import { selectOneApartment } from '../apartmentSlice';
import ApartmentsGallery from './ApartmentsGallery';
import { useTranslation } from 'react-i18next';
import { selectCurrency } from '../../currency/currencySlice';

const Apartment = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apartment = useAppSelector(selectOneApartment);
  const currency = useAppSelector(selectCurrency);

  const { hotelName, hotelId, apartmentId } = useParams() as {
    hotelName: string;
    hotelId: string;
    apartmentId: string;
  };

  useEffect(() => {
    dispatch(fetchOneApartment(apartmentId));
  }, [dispatch, apartmentId]);

  const onClickResolveApartment = () => {
    navigate(`/book-apartment/${hotelName}/${hotelId}/apartment/${apartmentId}`);
  };

  const services = ['1', '2', '3'];
  return (
    <>
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h4" component="p" textAlign={'center'}>
            {hotelName}
          </Typography>
          <Typography variant="h5" component="p" textAlign={'center'}>
            {apartment?.roomTypeId.name}
          </Typography>
          <Typography gutterBottom component="p">
            {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
          </Typography>

          <Typography gutterBottom component="p">
            {'Описание: ' + apartment?.description}
          </Typography>

          <Grid container xl>
            {services.map((service, index) => {
              return (
                <Grid container gap={1} item key={index} alignSelf={'center'}>
                  <Grid item>
                    <TaskAltIcon />
                  </Grid>
                  <Grid item sx={{ fontSize: 17 }}>
                    {service}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
      {apartment && <ApartmentsGallery apartmentData={apartment} />}
      <Box textAlign="right">
        <Button variant="outlined" sx={{ background: 'lightgreen' }} onClick={onClickResolveApartment}>
          {t('reserve')}
        </Button>
      </Box>
    </>
  );
};

export default Apartment;
