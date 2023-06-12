import React, { useState } from 'react';
import { createNewRoomType } from '../roomTypesThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectErrorCreateRoomType, selectLoadingCreateRoomType } from '../roomTypesSlice';
import { Box, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { someStyle } from '../../../styles';
import { RoomTypesMutation } from '../../../types';

const FormRoomTypes = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const loadingCreateRoomType = useAppSelector(selectLoadingCreateRoomType);
  const errorCreateRoomType = useAppSelector(selectErrorCreateRoomType);

  const [state, setState] = useState<RoomTypesMutation>({
    ru: '',
    en: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await dispatch(createNewRoomType(state)).unwrap();
      setState((prev) => {
        return {
          ...prev,
          ru: '',
          en: '',
        };
      });
    } catch {
      throw new Error();
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return errorCreateRoomType?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box component="form" onSubmit={submitFormHandler}>
        <Card sx={{ p: 2, boxShadow: someStyle.boxShadow }}>
          <Grid container spacing={5} direction="column" textAlign="center">
            <Grid item xs={12}>
              <Typography variant="h6" textTransform="uppercase">
                {t('createRoomType')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={'Тип номера на русском'}
                name="ru"
                value={state.ru}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('ru'))}
                helperText={getFieldError('ru')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={'Тип номера на английском'}
                name="en"
                value={state.en}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('en'))}
                helperText={getFieldError('en')}
                required
              />
            </Grid>
            <Grid item>
              <LoadingButton
                sx={{ background: '#0E8388' }}
                loading={loadingCreateRoomType}
                type="submit"
                color="success"
                variant="contained"
                size="small"
              >
                {t('create')}
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default FormRoomTypes;
