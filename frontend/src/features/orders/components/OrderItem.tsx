import React from 'react';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Order } from '../../../types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface props {
  prop: Order;
}

const OrderItem: React.FC<props> = ({ prop }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle2">Заказ № {prop._id}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Дата создания: {dayjs(prop.createdAt).format('DD-MM-YYYY')}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              Имя заказчика: {prop.userId.firstName} {prop.userId.lastName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Telephone number: {prop.userId.phoneNumber}</Typography>
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
