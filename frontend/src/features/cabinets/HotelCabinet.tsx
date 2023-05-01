import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { User } from '../../types';

const HotelCabinet = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser) as User;

  useEffect(() => {
    dispatch(fetchHotels(user._id));
  }, [dispatch, user._id]);
  return <div></div>;
};

export default HotelCabinet;
