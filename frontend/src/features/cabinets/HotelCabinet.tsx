import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { User } from '../../types';
import MyHotels from './components/MyHotels';
import { selectHotels } from '../hotels/hotelsSlice';

const HotelCabinet = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser) as User;
  const hotels = useAppSelector(selectHotels);

  useEffect(() => {
    dispatch(fetchHotels(user._id));
  }, [dispatch, user._id]);
  return (
    <div>
      <MyHotels hotels={hotels} />
    </div>
  );
};

export default HotelCabinet;
