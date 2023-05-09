import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import BlockAdditionalServices from './BlockAdditionalServices';
import CloseIcon from '@mui/icons-material/Close';

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
        <DialogContent sx={{ p: 1 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography>{t('additionalServices')}</Typography>
            <Button sx={{ p: 0 }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </Grid>
          <BlockAdditionalServices />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicesButton;
