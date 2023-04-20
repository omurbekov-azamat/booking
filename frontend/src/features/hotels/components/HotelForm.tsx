import React, { useState } from 'react';
import { selectCreateHotelError, selectLoadingCreateHotel } from '../hotelsSlice';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { createHotel } from '../hotelsThunks';
import { useNavigate } from 'react-router-dom';
import { HotelMutation } from '../../../types';

const HotelForm = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateHotelError);
  const loading = useAppSelector(selectLoadingCreateHotel);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = useState<HotelMutation>({
    name: '',
    address: '',
    star: 0,
    image: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createHotel(state));
    await setState({
      name: '',
      address: '',
      star: 0,
      image: null,
    });
    await navigate('/profile');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="div" variant="h5" textTransform="capitalize" color="salmon" sx={{ mt: 2 }}>
        {t('createHotel')}
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={submitFormHandler}>
        <Grid container spacing={2} textAlign="center" direction="column">
          <Grid item xs>
            <TextField
              label={t('hotelName')}
              name="name"
              autoComplete="current-name"
              value={state.name}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              label={t('address')}
              name="address"
              autoComplete="current-address"
              value={state.address}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('address'))}
              helperText={getFieldError('address')}
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              label={t('stars')}
              type="number"
              name="star"
              autoComplete="current-star"
              value={state.star}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('star'))}
              helperText={getFieldError('star')}
              inputProps={{ min: 0, max: 5 }}
            />
          </Grid>
          <Grid item xs>
            <FileInput
              label={t('image')}
              onChange={fileInputChangeHandler}
              name="image"
              type="images/*"
              error={error}
            />
          </Grid>
          <Grid item xs>
            <LoadingButton type="submit" color="success" variant="contained" loading={loading}>
              {t('create')}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HotelForm;
