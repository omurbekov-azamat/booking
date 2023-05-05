import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrders } from '../ordersSlice';
import { getOrders } from '../ordersThunks';
import { Grid } from '@mui/material';
import OrderCard from './OrderCard';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <OrderCard key={order._id} prop={order} />
      ))}
    </Grid>
  );
};

export default Orders;
