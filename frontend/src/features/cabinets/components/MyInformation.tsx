import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import { reAuthorization } from '../../users/usersThunks';
import Royal from '../../../components/UI/Status/Royal';
import { selectUser } from '../../users/usersSlice';
import Vip from '../../../components/UI/Status/vip';
import ChangePassword from './ChangePassword';
import HelpIcon from '@mui/icons-material/Help';
import { someStyle } from '../../../styles';
import CurveText from '../../../components/UI/CurveText/CurveText';

const MyInformation = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reAuthorization());
  }, [dispatch]);

  return (
    <Paper elevation={4} sx={{ minHeight: '300px', boxShadow: someStyle.boxShadow, p: 2 }}>
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
              <CurveText name="Cash back" data={`${user.cashback} coins`} />
              <Tooltip
                title={
                  <>
                    <CurveText name="1 coin" data="1KGS" />
                    <CurveText name="90 coin" data="1USD" />
                  </>
                }
                arrow
              >
                <HelpIcon color="primary" />
              </Tooltip>
            </Grid>
          )}
          <CurveText name="phoneNumber" data={user.phoneNumber} />
          <CurveText name="email" data={user.email} />
          <ChangePassword />
        </>
      )}
    </Paper>
  );
};

export default MyInformation;
