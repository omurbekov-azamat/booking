import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openCreateHotelForm = () => {
    navigate('/addHotel');
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
      <Grid item>
        <Typography component="div" variant="h5">
          {t('profile')}
        </Typography>
      </Grid>
      <Grid item>
        <LoadingButton variant="contained" color="warning" onClick={openCreateHotelForm}>
          {t('createHotel')}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Profile;
