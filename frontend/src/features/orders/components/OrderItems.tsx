import React from 'react';
import OrderItem from './OrderItem';
import { Typography } from '@mui/material';
import { Order } from '../../../types';

interface Props {
  ordersItems: Order[];
}

const OrderItems: React.FC<Props> = ({ ordersItems }) => {
  return (
    <>
      {ordersItems.length > 0 ? (
        ordersItems.map((item) => <OrderItem key={item._id} prop={item} />)
      ) : (
        <Typography>There are no orders</Typography>
      )}
    </>
  );
};

export default OrderItems;
