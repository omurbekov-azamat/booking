import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import { Order } from '../../../types';

interface props {
  prop: Order;
}

const OrderCard: React.FC<props> = ({ prop }) => {
  const statusColor = prop.status === 'open' ? 'red' : prop.status === 'in progress' ? 'yellow' : 'green';
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Заказ № {prop._id}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="end">
              <Typography variant="body2">{dayjs(prop.createdAt).format('DD-MM-YYYY')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign="center">
                {prop.userId.lastName} {prop.userId.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Отель : {prop.apartmentId.hotelId ? prop.apartmentId.hotelId.name : 'hotel name'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Комната : {prop.apartmentId.roomTypeId.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Заезд : {dayjs(prop.dateArrival).format('DD-MM-YYYY')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Выезд : {dayjs(prop.dateDeparture).format('DD-MM-YYYY')}</Typography>
            </Grid>
            <Grid item xs={12} textAlign="end">
              <Typography variant="body1" color={statusColor} textAlign="end">
                {prop.status}
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography>
                Оператор : {prop.adminId ? prop.adminId.lastName : 'no admin'}{' '}
                {prop.adminId ? prop.adminId.firstName : 'no admin'}
              </Typography>
            </Grid>
            <Paper>{prop.comment}</Paper>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OrderCard;
