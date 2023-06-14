import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import { reAuthorization } from '../../users/usersThunks';
import Royal from '../../../components/UI/Status/Royal';
import { selectUser } from '../../users/usersSlice';
import Vip from '../../../components/UI/Status/vip';
import { useTranslation } from 'react-i18next';
import ChangePassword from './ChangePassword';
import HelpIcon from '@mui/icons-material/Help';
import { someStyle } from '../../../styles';

const MyInformation = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reAuthorization());
  }, [dispatch]);

  return (
    <Paper elevation={4} sx={{ minHeight: '300px', boxShadow: someStyle.boxShadow }}>
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
              <Typography variant="subtitle1" sx={{ marginLeft: '20px', fontWeight: 'bold' }}>
                Cash Back : {user.cashback} coins
              </Typography>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography sx={{ p: 1 }}>1 coin = 1KGS</Typography>
                    <Typography sx={{ p: 1 }}>90 coins = 1USD</Typography>
                  </React.Fragment>
                }
                arrow
              >
                <HelpIcon color="primary" />
              </Tooltip>
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
