import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Paper from '@mui/material/Paper';
import { CircularProgress, Divider, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getUsers } from '../../users/usersThunks';
import { selectUsers, selectUsersLoading } from '../../users/usersSlice';
import UsersStatusChanger from './UsersStatusChanger';

const UsersStatus = () => {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const userLoading = useAppSelector(selectUsersLoading);

  useEffect(() => {
    if (lastName.length > 1) {
      dispatch(getUsers('nameMatch=' + lastName));
    }
  }, [lastName]);

  useEffect(() => {
    if (email.length > 1) {
      dispatch(getUsers('emailMatch=' + email));
    }
  }, [email]);

  const inputChangeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setEmail('');
  };
  const inputChangeMailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setLastName('');
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginTop: '15px' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по фамилии"
          onChange={inputChangeNameHandler}
          value={lastName}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchIcon />
      </Paper>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginY: '15px' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по почте"
          onChange={inputChangeMailHandler}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchIcon />
      </Paper>
      {userLoading ? (
        <CircularProgress />
      ) : users.length < 1 ? (
        'нету пользователей'
      ) : (
        users.map((el) => <UsersStatusChanger user={el} key={el._id} />)
      )}
    </div>
  );
};

export default UsersStatus;
