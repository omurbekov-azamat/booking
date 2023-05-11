import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../users/usersSlice';
import { useAppSelector } from '../../../app/hooks';
import { Order } from '../../../types';

interface props {
  prop: Order;
}

const OrderItem: React.FC<props> = ({ prop }) => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const background =
    prop.status === 'open' ? 'lightcoral' : prop.status === 'in progress' ? 'lightyellow' : 'lightgreen';

  const handleClickOnCheckout = (id: string) => {
    console.log(id);
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
              {t('creationDate')}: {dayjs(prop.createdAt).format('DD-MM-YYYY')}
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
          <Typography color="red">
            {t('meetingAirport')}: {prop.eventManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.personalTranslator && (
          <Typography color="red">
            {t('personalTranslator')}: {prop.personalTranslator && <>&#9745;</>}
          </Typography>
        )}
        {prop.tourManagement && (
          <Typography color="red">
            {t('tourOrganization')}: {prop.tourManagement && <>&#9745;</>}
          </Typography>
        )}
        {prop.eventManagement && (
          <Typography color="red">
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
        {user && user.role === 'admin' && prop.status === 'open' && (
          <Box textAlign="right">
            <Button variant="contained" color="success" onClick={() => handleClickOnCheckout(prop._id)}>
              {t('checkout')}
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderItem;
