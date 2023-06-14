import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Box, Grid, Paper, Tooltip, Typography } from '@mui/material';
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
          <Box textAlign="center">
            <Typography variant="h5">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
          {user && (user.role === 'user' || user.role === 'hotel') && (
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <CurveText name="status" />
              </Grid>
              <Grid item>
                {user.status === 'royal' && <Royal />}
                {user.status === 'vip' && <Vip />}
              </Grid>
              <Grid item>
                <Tooltip
                  title={
                    <>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda distinctio dolorem ex id
                      incidunt laborum modi nam officiis quam reprehenderit rerum, sed sequi, sunt totam ullam? Eveniet
                      exercitationem odit ut?
                    </>
                  }
                  arrow
                >
                  <HelpIcon color="disabled" />
                </Tooltip>
              </Grid>
            </Grid>
          )}
          {user && user.role === 'user' && (
            <Grid container alignItems="center">
              <Grid item>
                <CurveText name="Cash back" data={`${user.cashback} coins`} />
              </Grid>
              <Grid item>
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
