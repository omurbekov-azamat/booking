import React from 'react';
import OrderItem from './OrderItem';
import { Typography } from '@mui/material';
import { Order } from '../../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  ordersItems: Order[];
}

const OrderItems: React.FC<Props> = ({ ordersItems }) => {
  const { t } = useTranslation();
  return (
    <>
      {ordersItems.length > 0 ? (
        ordersItems.map((item) => <OrderItem key={item._id} prop={item} />)
      ) : (
        <Typography>{t('thereAreNoOrders')}</Typography>
      )}
    </>
  );
};

export default OrderItems;
