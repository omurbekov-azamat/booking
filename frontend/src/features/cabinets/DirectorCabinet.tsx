import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAdmins } from '../users/usersThunks';
import { selectAdmins, selectGetAdminsLoading } from '../users/usersSlice';
import { Typography } from '@mui/material';

const DirectorCabinet = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectGetAdminsLoading);
  const admins = useAppSelector(selectAdmins);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  return (
    <>
      {loading && <Typography>loading...</Typography>}
      <div> director cabinet</div>
    </>
  );
};

export default DirectorCabinet;
