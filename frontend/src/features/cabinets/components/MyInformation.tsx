import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Box, Paper, Typography } from '@mui/material';
import { reAuthorization } from '../../users/usersThunks';
import Royal from '../../../components/UI/Status/Royal';
import { selectUser } from '../../users/usersSlice';
import Vip from '../../../components/UI/Status/vip';
import ChangePassword from './ChangePassword';
import { someStyle } from '../../../styles';
import CurveText from '../../../components/UI/CurveText/CurveText';
import CurveGrid from '../../../components/UI/CurveGrid/CurveGrid';

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
            <CurveGrid
              color="blue"
              spacing={1}
              text={<CurveText name="status" />}
              icon={
                <>
                  {user.status === 'royal' && <Royal />}
                  {user.status === 'vip' && <Vip />}
                </>
              }
              tooltipInformation={
                <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda distinctio dolorem ex</>
              }
            />
          )}
          {user && user.role === 'user' && (
            <CurveGrid
              color="grey"
              spacing={0}
              text={<CurveText name="Cash back" data={`${user.cashback} coins`} />}
              tooltipInformation={
                <>
                  <CurveText name="1 coin" data="1KGS" />
                  <CurveText name="90 coin" data="1USD" />
                </>
              }
            />
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
