import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import Royal from '../../../components/UI/Status/Royal';
import Vip from '../../../components/UI/Status/vip';
import { useTranslation } from 'react-i18next';
import ChangePassword from './ChengePassword/ChangePassword';

const MyInformation = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <Paper elevation={4} sx={{ minHeight: '300px' }}>
      {user && (
        <>
          <Grid container justifyContent="center">
            <Typography variant="h3">
              {user.firstName} {user.lastName}
            </Typography>
            {user.status === 'royal' && <Royal />}
            {user.status === 'vip' && <Vip />}
          </Grid>
          <Typography textAlign="right" variant="subtitle1" sx={{ marginX: '20px', fontWeight: 'bold' }}>
            Cash Back : {user.cashback}
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('phoneNumber')} : {user.phoneNumber}
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('email')} : {user.email}
          </Typography>
          <ChangePassword />
        </>
      )}
    </Paper>
  );
};

export default MyInformation;
