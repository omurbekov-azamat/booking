import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getAdmins } from '../users/usersThunks';

const DirectorCabinet = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  return <div>director cabinet</div>;
};

export default DirectorCabinet;
