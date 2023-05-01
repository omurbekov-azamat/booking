import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UserCabinet = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography component="div" variant="h5">
        {t('myOrders')}
      </Typography>
    </>
  );
};

export default UserCabinet;
