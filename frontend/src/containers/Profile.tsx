import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/usersSlice';
import UserCabinet from '../features/cabinets/UserCabinet';

const Profile = () => {
  const user = useAppSelector(selectUser);

  let showCabinet: JSX.Element = <></>;

  if (user && user.role === 'user') {
    showCabinet = <UserCabinet />;
  }

  return showCabinet;
};

export default Profile;
