import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrders } from '../ordersSlice';
import { getOrders } from '../ordersThunks';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OrderCard from './OrderCard';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <Typography component="div" variant="h5" textAlign="center" mt={3}>
        {t('myOrders')}
      </Typography>
      {orders.map((order) => (
        <OrderCard key={order._id} prop={order} />
      ))}
    </>
  );
};

export default Orders;
