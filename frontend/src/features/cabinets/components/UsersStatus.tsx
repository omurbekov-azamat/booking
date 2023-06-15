import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Paper from '@mui/material/Paper';
import { CircularProgress, Divider, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getUsers } from '../../users/usersThunks';
import { selectUsers, selectUsersLoading } from '../../users/usersSlice';
import UsersStatusChanger from './UsersStatusChanger';
import { useTranslation } from 'react-i18next';

const UsersStatus = () => {
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const userLoading = useAppSelector(selectUsersLoading);
  const { t } = useTranslation();

  useEffect(() => {
    if (lastName.length > 1) {
      dispatch(getUsers('nameMatch=' + lastName));
    }
  }, [lastName, dispatch]);

  useEffect(() => {
    if (email.length > 1) {
      dispatch(getUsers('emailMatch=' + email));
    }
  }, [email, dispatch]);

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
          placeholder={t('searchBySurname') as string}
          onChange={inputChangeNameHandler}
          value={lastName}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchIcon />
      </Paper>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginY: '15px' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('searchByEmail') as string}
          onChange={inputChangeMailHandler}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchIcon />
      </Paper>
      {userLoading ? (
        <CircularProgress />
      ) : !users.length ? (
        <Typography sx={{ my: 2, color: 'grey' }}>{t('usersNotFound')}</Typography>
      ) : (
        users.map((el) => <UsersStatusChanger user={el} key={el._id} />)
      )}
    </div>
  );
};

export default UsersStatus;
