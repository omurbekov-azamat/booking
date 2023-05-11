import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeStatusOrder, getForAdminHisOrders, getOrders } from '../ordersThunks';
import { Order } from '../../../types';

interface Props {
  prop: Order;
}

const OrderItem: React.FC<Props> = ({ prop }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const background = prop.status === 'open' ? '#FFEAE9' : prop.status === 'in progress' ? 'lightyellow' : '#CCFFCD';

  const handleClickOnCheckout = async (id: string) => {
    await dispatch(changeStatusOrder({ id: id, status: 'in progress' }));
    await dispatch(getOrders());
  };

  const handleClickOnClose = async (id: string) => {
    if (user?._id) {
      await dispatch(changeStatusOrder({ id: id, status: 'closed' }));
      await dispatch(getForAdminHisOrders(user?._id));
    }
  };

  return (
    <Accordion sx={{ background }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={12} lg={6} xl={3}>
            <Typography variant="subtitle2">
              {t('order')} № {prop._id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={3}>
            <Typography variant="subtitle2">
              {t('customerName')}: {prop.userId.firstName} {prop.userId.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={3}>
            <Typography variant="subtitle2">
              {t('creationDate')}: {dayjs(prop.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={3}>
            <Typography variant="subtitle2">
              {t('telephoneNumber')}: {prop.userId.phoneNumber}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ background: 'WhiteSmoke' }}>
        <Typography>
          {t('dateArrival')}: {dayjs(prop.dateArrival).format('DD-MM-YYYY')}
        </Typography>
        <Typography>
          {t('dateDeparture')}: {dayjs(prop.dateDeparture).format('DD-MM-YYYY')}
        </Typography>
        {prop.eventManagement && (
          <Typography color="red" fontWeight="bold">
            {t('meetingAirport')}: {prop.eventManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.personalTranslator && (
          <Typography color="red" fontWeight="bold">
            {t('personalTranslator')}: {prop.personalTranslator && <>&#9745;</>}
          </Typography>
        )}
        {prop.tourManagement && (
          <Typography color="red" fontWeight="bold">
            {t('tourOrganization')}: {prop.tourManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.eventManagement && (
          <Typography color="red" fontWeight="bold">
            {t('eventOrganization')}: {prop.eventManagement && <>&#9745;</>}
          </Typography>
        )}
        <Typography textTransform="capitalize">
          {t('city')}: {prop.apartmentId.hotelId.city}
        </Typography>
        <Typography textTransform="capitalize">
          {t('address')}: {prop.apartmentId.hotelId.address}
        </Typography>
        <Typography textTransform="capitalize">
          {t('hotelName')}: {prop.apartmentId.hotelId.name}
        </Typography>
        <Typography textTransform="capitalize">
          {t('roomType')}: {prop.apartmentId.roomTypeId.name}
        </Typography>
        <Typography>
          {t('commentary')}: {prop.comment}
        </Typography>
        <Typography sx={{ background }}>
          {t('status')}: {prop.status}
        </Typography>
        {user && (user.role === 'admin' || user.role === 'director') && prop.adminId && (
          <Typography fontWeight="bolder" color="blueviolet">
            Бронь оформил: {prop.adminId.firstName} {prop.adminId.lastName}
          </Typography>
        )}
        {user && user.role === 'admin' && prop.status === 'open' && (
          <Box textAlign="right">
            <Button variant="contained" color="success" onClick={() => handleClickOnCheckout(prop._id)}>
              Оформить бронь
            </Button>
          </Box>
        )}
        {user && user.role === 'admin' && prop.status === 'in progress' && (
          <Box textAlign="right">
            <Button variant="contained" color="secondary" onClick={() => handleClickOnClose(prop._id)}>
              закрыть
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderItem;
