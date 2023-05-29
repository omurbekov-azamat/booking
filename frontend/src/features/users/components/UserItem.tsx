import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { User } from '../../../types';

interface Props {
  prop: User;
}

const UserItem: React.FC<Props> = ({ prop }) => {
  return (
    <Accordion
      sx={{
        boxShadow:
          '0px 2px 1px -1px rgba(3, 201, 136, 0.7), 0px 1px 1px 0px rgba(3, 201, 136, 0.7), 0px 1px 3px 0px rgba(3, 201, 136, 0.7)',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography textTransform="capitalize">
          {prop.firstName} {prop.lastName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ background: 'WhiteSmoke' }}>
        <Typography textTransform="capitalize">Имя: {prop.firstName}</Typography>
        <Typography textTransform="capitalize">Фамилия: {prop.lastName}</Typography>
        <Typography>Почта: {prop.email}</Typography>
        <Typography>Номер телефона: {prop.phoneNumber}</Typography>
        <Typography textTransform="capitalize">Роль: {prop.role}</Typography>
        <Typography>Статус: {prop.status}</Typography>
        <Typography>Баланс: {prop.cashback}</Typography>
        <Typography>Верифицирован: {prop.isVerified ? 'Да' : 'Нет'}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserItem;
