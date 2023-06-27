import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import { register } from './usersThunks';
import { Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type { RegisterMutation } from '../../types';
import { useTranslation } from 'react-i18next';
import { MuiTelInput } from 'mui-tel-input';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const phoneChangeHandler = (newPhone: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: newPhone }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return '';
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#03C988' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signUp')}
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t('email')}
                name="email"
                autoComplete="new-email"
                type="email"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('password')}
                name="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('firstName')}
                name="firstName"
                autoComplete="new-firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('firstName'))}
                helperText={getFieldError('firstName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('lastName')}
                name="lastName"
                autoComplete="new-lastName"
                value={state.lastName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('lastName'))}
                helperText={getFieldError('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTelInput
                label={t('phoneNumber')}
                onChange={phoneChangeHandler}
                defaultCountry={'KG'}
                name="phoneNumber"
                error={Boolean(getFieldError('phoneNumber'))}
                helperText={getFieldError('phoneNumber')}
                value={state.phoneNumber}
              />
            </Grid>
          </Grid>
          <LoadingButton
            color="success"
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: '#0E8388' }}
          >
            {t('signUp')}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {t('signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
