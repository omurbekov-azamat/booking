import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/usersSlice';
import UserCabinet from '../features/cabinets/UserCabinet';
import HotelCabinet from '../features/cabinets/HotelCabinet';
import AdminCabinet from '../features/cabinets/AdminCabinet';

const Profile = () => {
  const user = useAppSelector(selectUser);

  let showCabinet: JSX.Element = <></>;

  if (user && user.role === 'user') {
    showCabinet = <UserCabinet />;
  }
  if (user && user.role === 'hotel') {
    showCabinet = <HotelCabinet />;
  }

  if (user && user.role === 'admin') {
    showCabinet = <AdminCabinet />;
  }

  return showCabinet;
};

export default Profile;
