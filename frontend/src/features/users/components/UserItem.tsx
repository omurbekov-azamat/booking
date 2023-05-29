import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import { LoadingButton } from '@mui/lab';
import { changeRole, getByRole } from '../usersThunks';
import Button from '@mui/material/Button';
import { User } from '../../../types';

interface Props {
  prop: User;
  role: string;
}

const UserItem: React.FC<Props> = ({ prop, role }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [state] = useState({
    id: prop._id,
    role: 'admin',
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleYes = () => {
    dispatch(changeRole(state));
    dispatch(getByRole(role));
    setOpen(false);
  };

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
        <Typography>Статус: {prop.status}</Typography>
        <Typography>Баланс: {prop.cashback}</Typography>
        <Typography>Верифицирован: {prop.isVerified ? 'Да' : 'Нет'}</Typography>
        <Typography textTransform="capitalize">Роль: {prop.role}</Typography>
        {user?.role === 'admin' && (
          <LoadingButton color="success" onClick={handleClick}>
            Изменить роль
          </LoadingButton>
        )}
      </AccordionDetails>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {user?.role === 'admin' && (
          <>
            <DialogContent>
              <Typography variant="body1">
                Вы уверены, что хотите {prop.firstName.toUpperCase()} {prop.lastName.toUpperCase()} дать возможность
                публиковать свой услуги?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>отмена</Button>
              <Button onClick={handleYes}>да</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Accordion>
  );
};

export default UserItem;
