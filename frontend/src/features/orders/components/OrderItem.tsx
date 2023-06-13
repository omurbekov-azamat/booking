import React, { useState } from 'react';
import { changeStatusOrder, getForAdminHisOrders, getOrders, useBonusOnOrder } from '../ordersThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrderChangeStatusLoading } from '../ordersSlice';
import { selectCurrency } from '../../currency/currencySlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectUser } from '../../users/usersSlice';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
} from '@mui/material';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { Order } from '../../../types';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

interface Props {
  prop: Order;
}

const OrderItem: React.FC<Props> = ({ prop }) => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const user = useAppSelector(selectUser);
  const buttonLoading = useAppSelector(selectOrderChangeStatusLoading);
  const currency = useAppSelector(selectCurrency);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleConfirm = async (id: string) => {
    await dispatch(useBonusOnOrder({ id: id, bonusUse: parseInt(value) })).unwrap();
    await setOpen(false);
    await setValue('');
  };

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

  const inputValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
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
          <Typography color="deepskyblue" fontWeight="bold">
            {t('meetingAirport')}: {prop.eventManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.personalTranslator && (
          <Typography color="blueviolet" fontWeight="bold">
            {t('personalTranslator')}: {prop.personalTranslator && <>&#9745;</>}
          </Typography>
        )}
        {prop.tourManagement && (
          <Typography color="green" fontWeight="bold">
            {t('tourOrganization')}: {prop.tourManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.eventManagement && (
          <Typography color="darkmagenta" fontWeight="bold">
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
              size="small"
              sx={{ background: '#05BFDB' }}
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
              color="success"
              onClick={() => handleClickOnClose(prop._id)}
              size="small"
              sx={{ background: '#0E8388' }}
            >
              закрыть
            </LoadingButton>
          </Box>
        )}
        {user &&
          user.role === 'user' &&
          user.cashback > 0 &&
          (prop.status === 'open' || prop.status === 'in progress') && (
            <Box component="form" onSubmit={submitFormHandler}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography>{t('howManyBonuses')}</Typography>
                </Grid>
                <Grid item>
                  <input
                    type="number"
                    value={value}
                    onChange={inputValueChangeHandler}
                    min={1}
                    max={user.cashback}
                    required={true}
                  />
                </Grid>
                <Grid item>
                  <LoadingButton type="submit" size="small">
                    {t('send')}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          )}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <Typography variant="body1">{`${t('youWantUseBonuses')} ${value} ${t('bonusesOn')} №${prop._id} ${t(
              'order',
            ).toLowerCase()}?`}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
            <Button onClick={() => handleConfirm(prop._id)}>{t('continue')}</Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderItem;
