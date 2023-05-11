import React from 'react';
import OrderItem from './OrderItem';
import { Typography } from '@mui/material';
import { Order } from '../../../types';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { selectFetchOrdersForAdminLoading, selectFetchOrdersLoading } from '../ordersSlice';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
  ordersItems: Order[];
}

const OrderItems: React.FC<Props> = ({ ordersItems }) => {
  const { t } = useTranslation();
  const ordersLoading = useAppSelector(selectFetchOrdersLoading);
  const ordersLoadingForAdmin = useAppSelector(selectFetchOrdersForAdminLoading);
  return (
    <>
      {ordersLoading || ordersLoadingForAdmin ? <Spinner /> : null}
      {ordersItems.length > 0 ? (
        ordersItems.map((item) => <OrderItem key={item._id} prop={item} />)
      ) : (
        <Typography>{t('thereAreNoOrders')}</Typography>
      )}
    </>
  );
};

export default OrderItems;
