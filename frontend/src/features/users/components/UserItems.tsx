import React from 'react';
import { selectGetUsersByRoleLoading } from '../usersSlice';
import { useAppSelector } from '../../../app/hooks';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Typography } from '@mui/material';
import UserItem from './UserItem';
import { User } from '../../../types';

interface Props {
  prop: User[];
}

const UserItems: React.FC<Props> = ({ prop }) => {
  const loading = useAppSelector(selectGetUsersByRoleLoading);
  return (
    <>
      {loading && <Spinner />}
      {prop.length > 0 ? (
        prop.map((item) => <UserItem key={item._id} prop={item} />)
      ) : (
        <Typography>There are no users</Typography>
      )}
    </>
  );
};

export default UserItems;
