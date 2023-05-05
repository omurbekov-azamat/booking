import React, { useEffect, useState } from 'react';
import { Button, Container, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHotels } from '../hotels/hotelsSlice';
import HotelsCard from '../hotels/components/HotelsCard';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { selectAdminMyOrders } from '../orders/ordersSlice';
import { getForAdminHisOrders } from '../orders/ordersThunks';
import OrderCard from '../orders/components/OrderCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AdminCabinet = () => {
  const user = useAppSelector(selectUser);
  const hotelsState = useAppSelector(selectHotels);
  const orders = useAppSelector(selectAdminMyOrders);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [state, setState] = useState({
    myHotels: false,
    orders: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
      [e.target.name === 'myHotels' ? 'orders' : 'myHotels']: false,
    });
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchHotels(user._id));
      dispatch(getForAdminHisOrders(user._id));
    }
  }, [dispatch, user]);

  return (
    <>
      <Container>
        <Typography variant="h4" component="p" textAlign={'center'}>
          {t('adminCabinet')}
        </Typography>
        <Grid container justifyContent={'end'}>
          <Button variant="contained" color="success" onClick={() => navigate('/addHotel')}>
            {t('createHotel')}
          </Button>
        </Grid>
        <RadioGroup>
          <FormControlLabel
            control={<Radio checked={state.myHotels} onChange={handleChange} name="myHotels" />}
            label={t('myHotels')}
          />
          <FormControlLabel
            control={<Radio checked={state.orders} onChange={handleChange} name="orders" />}
            label={t('myOrders')}
          />
        </RadioGroup>
      </Container>

      {state.myHotels && (
        <>
          <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
            {hotelsState.map((el) => (
              <Grid item xs={12} sm={6} lg={4} key={Math.random()} alignItems="stretch">
                <HotelsCard hotel={el} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {state.orders && (
        <>
          {orders.map((item) => {
            return <OrderCard prop={item} key={item._id} />;
          })}
        </>
      )}
    </>
  );
};

export default AdminCabinet;
