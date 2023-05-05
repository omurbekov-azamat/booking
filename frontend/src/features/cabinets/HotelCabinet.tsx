import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { User } from '../../types';
import MyHotels from './components/MyHotels';
import { selectHotels } from '../hotels/hotelsSlice';
import { Button, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const HotelCabinet = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser) as User;
  const hotels = useAppSelector(selectHotels);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHotels(user._id));
  }, [dispatch, user._id]);
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container justifyContent={'end'}>
          <Button variant="contained" color="success" onClick={() => navigate('/addHotel')}>
            {t('createHotel')}
          </Button>
        </Grid>

        <MyHotels hotels={hotels} />
      </Container>
    </>
  );
};

export default HotelCabinet;
