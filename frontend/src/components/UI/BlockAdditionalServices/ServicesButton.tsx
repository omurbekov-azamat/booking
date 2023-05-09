import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import BlockAdditionalServices from './BlockAdditionalServices';

const MyButton = styled(Button)({
  position: 'fixed',
  bottom: 115,
  right: 40,
  width: 50,
  height: 60,
  padding: 0,
  borderRadius: '50%',
  backgroundColor: 'lightblue',
  '&:hover': {
    backgroundColor: 'skyblue',
  },
  zIndex: 9999,
});

const ServicesButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const { t } = useTranslation();
  return (
    <>
      <MyButton onClick={handleClick}>
        <DesignServicesIcon sx={{ color: '#ffffff' }} />
      </MyButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('additionalServices')}</DialogTitle>
        <DialogContent>
          <BlockAdditionalServices />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServicesButton;
