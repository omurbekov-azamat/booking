import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <Typography component="div" variant="h5" sx={{ mt: 3 }}>
      {t('profile')}
    </Typography>
  );
};

export default Profile;
