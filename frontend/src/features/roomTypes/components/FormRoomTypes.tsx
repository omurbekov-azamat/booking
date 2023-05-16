import React, { useState } from 'react';
import { createNewRoomType } from '../roomTypesThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectErrorCreateRoomType, selectLoadingCreateRoomType } from '../roomTypesSlice';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { RoomTypesMutation } from '../../../types';

const FormRoomTypes = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const loadingCreateRoomType = useAppSelector(selectLoadingCreateRoomType);
  const errorCreateRoomType = useAppSelector(selectErrorCreateRoomType);

  const [state, setState] = useState<RoomTypesMutation>({
    name: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createNewRoomType(state)).unwrap();
  };

  const getFieldError = (fieldName: string) => {
    try {
      return errorCreateRoomType?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Box component="form" onSubmit={submitFormHandler}>
      <Grid container spacing={5} flexDirection="column" textAlign="center">
        <Grid item>
          <Typography variant="h5" textTransform="uppercase">
            Создать тип компнаты
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label={t('roomType')}
            name="name"
            value={state.name}
            onChange={inputChangeHandler}
            sx={{ width: '300px' }}
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
            required
          />
        </Grid>
        <Grid item>
          <LoadingButton loading={loadingCreateRoomType} type="submit" variant="contained">
            {t('create')}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormRoomTypes;
