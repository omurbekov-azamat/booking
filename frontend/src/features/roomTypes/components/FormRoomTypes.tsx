import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createNewRoomType, fetchOneRoomType } from '../roomTypesThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectErrorCreateRoomType,
  selectFetchOneRoomTypeLoading,
  selectLoadingCreateRoomType,
  selectOneRoomType,
} from '../roomTypesSlice';
import { Box, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { someStyle } from '../../../styles';
import { RoomTypesMutation } from '../../../types';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface Props {
  isEdit?: boolean;
}

const FormRoomTypes: React.FC<Props> = ({ isEdit }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { t } = useTranslation();
  const loadingCreateRoomType = useAppSelector(selectLoadingCreateRoomType);
  const errorCreateRoomType = useAppSelector(selectErrorCreateRoomType);
  const oneRoomType = useAppSelector(selectOneRoomType);
  const oneRoomTypeLoading = useAppSelector(selectFetchOneRoomTypeLoading);

  const [state, setState] = useState<RoomTypesMutation>({
    ru: '',
    en: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      console.log(state);
    } else {
      await dispatch(createNewRoomType(state)).unwrap();
      setState((prev) => {
        return {
          ...prev,
          ru: '',
          en: '',
        };
      });
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return errorCreateRoomType?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchOneRoomType(id));
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && oneRoomType) {
      setState({ en: oneRoomType.name.en, ru: oneRoomType.name.ru });
    }
  }, [oneRoomType, setState, isEdit, id]);

  return (
    <>
      {oneRoomTypeLoading && <Spinner />}
      <Container component="main" maxWidth="sm">
        <Box component="form" onSubmit={submitFormHandler}>
          <Card sx={{ p: 2, boxShadow: someStyle.boxShadow }}>
            <Grid container spacing={5} direction="column" textAlign="center">
              <Grid item xs={12}>
                <Typography variant="h6" textTransform="uppercase">
                  {isEdit ? 'Изменить тип комнаты' : t('createRoomType')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label={t('typeRoomFormRu')}
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
                  label={t('typeRoomFormEng')}
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
                  {isEdit ? 'Изменить' : t('create')}
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default FormRoomTypes;
