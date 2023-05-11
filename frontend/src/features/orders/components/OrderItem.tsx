import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Order } from '../../../types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

interface props {
  prop: Order;
}

const OrderItem: React.FC<props> = ({ prop }) => {
  const { t } = useTranslation();
  return (
    <Accordion>
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
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderItem;
