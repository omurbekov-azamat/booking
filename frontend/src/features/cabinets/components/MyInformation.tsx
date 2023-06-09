import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import Royal from '../../../components/UI/Status/Royal';
import Vip from '../../../components/UI/Status/vip';
import { useTranslation } from 'react-i18next';
import ChangePassword from './ChangePassword';
import HelpIcon from '@mui/icons-material/Help';

const MyInformation = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <Paper elevation={4} sx={{ minHeight: '300px' }}>
      {user && (
        <>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Typography variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
            <Grid item>
              {user.status === 'royal' && <Royal />}
              {user.status === 'vip' && <Vip />}
            </Grid>
          </Grid>
          {user && user.role === 'user' && (
            <Grid container alignItems="center">
              <Typography textAlign="right" variant="subtitle1" sx={{ marginLeft: '20px', fontWeight: 'bold' }}>
                Cash Back : {user.cashback}
              </Typography>
              <Button>
                <HelpIcon />
              </Button>
            </Grid>
          )}
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('phoneNumber')} : {user.phoneNumber}
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('email')} : {user.email}
          </Typography>
          {<ChangePassword />}
        </>
      )}
    </Paper>
  );
};

export default MyInformation;
