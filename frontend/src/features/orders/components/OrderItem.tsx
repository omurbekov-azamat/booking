import React from 'react';
import { changeStatusOrder, getForAdminHisOrders, getOrders } from '../ordersThunks';
import { selectOrderChangeStatusLoading } from '../ordersSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../users/usersSlice';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { Order } from '../../../types';
import { selectCurrency } from '../../currency/currencySlice';

interface Props {
  prop: Order;
}

const OrderItem: React.FC<Props> = ({ prop }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const buttonLoading = useAppSelector(selectOrderChangeStatusLoading);
  const { t, i18n } = useTranslation();
  const currency = useAppSelector(selectCurrency);
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
          {t('dateArrival')}: {prop.dateArrival}
        </Typography>
        <Typography>
          {t('dateDeparture')}: {prop.dateDeparture}
        </Typography>
        {prop.eventManagement && (
          <Typography color="blue" fontWeight="bold">
            {t('meetingAirport')}: {prop.eventManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.personalTranslator && (
          <Typography color="blue" fontWeight="bold">
            {t('personalTranslator')}: {prop.personalTranslator && <>&#9745;</>}
          </Typography>
        )}
        {prop.tourManagement && (
          <Typography color="blue" fontWeight="bold">
            {t('tourOrganization')}: {prop.tourManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.eventManagement && (
          <Typography color="blue" fontWeight="bold">
            {t('eventOrganization')}: {prop.eventManagement && <>&#9745;</>}
          </Typography>
        )}

        {prop.apartmentId.hotelId ? (
          <>
            <Typography textTransform="capitalize">
              {t('city')}: {prop.apartmentId.hotelId.city}
            </Typography>
            <Typography textTransform="capitalize">
              {i18n.language === 'ru'
                ? t('address') + ': ' + prop.apartmentId.hotelId.address.adrRu
                : prop.apartmentId.hotelId.address.adrEn}
            </Typography>
            <Typography textTransform="capitalize">
              {t('hotelName')}: {prop.apartmentId.hotelId.name}
            </Typography>
          </>
        ) : (
          <Typography color={'error'}>{t('hotelWasDeleted')}</Typography>
        )}

        {prop.apartmentId ? (
          <Typography textTransform="capitalize">
            {i18n.language === 'en' ? prop.apartmentId.roomTypeId.name.en : prop.apartmentId.roomTypeId.name.ru}
          </Typography>
        ) : (
          <Typography color={'error'}>{t('apartmentWasDeleted')}</Typography>
        )}

        <Typography>
          {t('commentary')}: {prop.comment}
        </Typography>
        <Typography>
          {t('amountOfDays')}: {prop.amountOfDays}
        </Typography>
        <Typography>
          {t('payableAmount')}: {currency === 'kgs' ? prop.totalPrice.kgs + ' KGS' : prop.totalPrice.usd + ' USD'}
        </Typography>
        {(prop.eventManagement || prop.tourManagement || prop.personalTranslator || prop.meetingAirport) && (
          <Typography color="red">{t('additionalServicesAreCharged')}</Typography>
        )}
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
            <LoadingButton
              variant="contained"
              loading={buttonLoading === prop._id}
              color="success"
              onClick={() => handleClickOnCheckout(prop._id)}
            >
              Оформить бронь
            </LoadingButton>
          </Box>
        )}
        {user && user.role === 'admin' && prop.status === 'in progress' && (
          <Box textAlign="right">
            <LoadingButton
              variant="contained"
              loading={buttonLoading === prop._id}
              color="secondary"
              onClick={() => handleClickOnClose(prop._id)}
            >
              закрыть
            </LoadingButton>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderItem;
