import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';

const RestorePassword = () => {
  const [email, setEmail] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t('restorePassword')}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('restorePassword')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('restorePasswordDesc')}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('email')}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={handleClose}>{t('send')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RestorePassword;
