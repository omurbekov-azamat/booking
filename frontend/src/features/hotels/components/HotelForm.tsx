import React, { useState } from 'react';
import { selectCreateHotelError, selectLoadingCreateHotel } from '../hotelsSlice';
import { Alert, Box, Card, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../../../components/UI/FileInput/FileInput';
import SelectCities from '../../../components/UI/SelecetCities/SelectCities';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { createHotel, editHotel, fetchOneHotel, removeHotelImage } from '../hotelsThunks';
import { useNavigate } from 'react-router-dom';
import { HotelMutation } from '../../../types';
import ListFacilities from '../../../components/UI/ListFacilities/ListFacilities';
import SelectType from '../../../components/UI/SelectType/SelectType';
import { apiURL } from '../../../constants';
import Resizer from 'react-image-file-resizer';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { someStyle } from '../../../styles';

interface Props {
  editedHotel?: HotelMutation;
  isEdit?: boolean;
  hotelId?: string;
}

const HotelForm: React.FC<Props> = ({ editedHotel, isEdit, hotelId }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateHotelError);
  const loading = useAppSelector(selectLoadingCreateHotel);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialState = editedHotel
    ? {
        ...editedHotel,
      }
    : {
        name: '',
        city: '',
        address: {
          adrRu: '',
          adrEn: '',
        },
        star: '',
        image: null,
        parking: false,
        petFriendly: false,
        swimmingPool: false,
        nonSmokingRooms: false,
        founding: 0,
        type: '',
        lowestPrice: {
          som: 0,
          dollar: 0,
        },
        description: {
          ru: '',
          en: '',
        },
      };

  const [state, setState] = useState<HotelMutation>(initialState);
  const [imageRequired, setImageRequired] = useState(false);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'som':
      case 'dollar':
        setState((prev) => ({
          ...prev,
          lowestPrice: {
            ...prev.lowestPrice,
            [name]: parseFloat(value),
          },
        }));
        break;
      case 'ru':
      case 'en':
        setState((prev) => ({
          ...prev,
          description: {
            ...prev.description,
            [name]: value,
          },
        }));
        break;
      case 'adrRu':
      case 'adrEn':
        setState((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [name]: value,
          },
        }));
        break;
      default:
        setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1080,
        'jpg',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    });

  const fileInputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      const image = await resizeFile(files[0]);

      setState((prev) => ({
        ...prev,
        [name]: image,
      }));
    }
  };

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setState((prev) => ({ ...prev, [name]: checked }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.image) {
      setImageRequired(true);
    } else {
      if (isEdit) {
        await dispatch(editHotel({ hotel: state, id: hotelId as string }));
      } else {
        await dispatch(createHotel(state));
        await setState({
          name: '',
          city: '',
          address: {
            adrRu: '',
            adrEn: '',
          },
          type: '',
          star: '',
          image: null,
          parking: false,
          petFriendly: false,
          swimmingPool: false,
          nonSmokingRooms: false,
          founding: 0,
          lowestPrice: {
            som: 0,
            dollar: 0,
          },
          description: {
            ru: '',
            en: '',
          },
        });
      }
      await navigate('/my-cabinet');
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const deleteImage = () => {
    setState({ ...state, image: null });
  };

  const deleteOldImage = async (id: string) => {
    await dispatch(removeHotelImage(id));
    await dispatch(fetchOneHotel(id));
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Card sx={{ p: 2, textAlign: 'center', boxShadow: someStyle.boxShadow }}>
          <Typography variant="h5" textTransform="capitalize">
            {isEdit ? t('editHotel') : t('createHotel')}
          </Typography>
          <Box component="form" mt={2} onSubmit={submitFormHandler}>
            <Grid container spacing={2} textAlign="center">
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <SelectCities onChange={inputChangeHandler} name="city" label={t('city')} value={state.city} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={'Адрес'}
                  name="adrRu"
                  autoComplete="current-address"
                  value={state.address.adrRu}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('adrRu'))}
                  helperText={getFieldError('adrRu')}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={'Address'}
                  name="adrEn"
                  autoComplete="current-address"
                  value={state.address.adrEn}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('adrEn'))}
                  helperText={getFieldError('adrEn')}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectType onChange={inputChangeHandler} name="type" label={t('type')} value={state.type} />
              </Grid>
              <Grid item xs={12} md={6}>
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
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t('founding')}
                  type="number"
                  name="founding"
                  autoComplete="current-founding"
                  value={state.founding}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('founding'))}
                  helperText={getFieldError('founding')}
                  inputProps={{ min: 1500 }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Grid container justifyContent={'space-around'}>
                  <h3>{t('lowestPrice')}</h3>
                  <Grid item xs={3}>
                    <TextField
                      type={'number'}
                      label={t('som')}
                      name="som"
                      autoComplete="current-som"
                      value={state.lowestPrice.som}
                      onChange={inputChangeHandler}
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      type={'number'}
                      label={t('dollar')}
                      name="dollar"
                      autoComplete="current-dollar"
                      value={state.lowestPrice.dollar}
                      onChange={inputChangeHandler}
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  multiline
                  rows={3}
                  label={'Описание (мин 150 символов)'}
                  name="ru"
                  autoComplete="current-name"
                  value={state.description.ru}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('ru'))}
                  helperText={getFieldError('ru')}
                  inputProps={{ minLength: 150, maxLength: 300 }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  multiline
                  rows={3}
                  label={'Description (min 150 symbols)'}
                  name="en"
                  autoComplete="current-name"
                  value={state.description.en}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('en'))}
                  helperText={getFieldError('en')}
                  inputProps={{ minLength: 150, maxLength: 300 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <ListFacilities onChange={handleChangeCheckBox} width={245} />
              </Grid>
              <Grid item xs={12}>
                <FileInput
                  label={t('image')}
                  onChange={fileInputChangeHandler}
                  name="image"
                  type="images/*"
                  error={error}
                />
              </Grid>
              <Grid item xs={12}>
                {imageRequired && <Alert severity="error">Image is required</Alert>}
              </Grid>
              <Grid item xs={12}>
                {editedHotel?.image && isEdit && (
                  <Grid container marginLeft={3} alignItems="center">
                    <Grid item>
                      <img src={apiURL + '/' + editedHotel.image} style={{ width: '100px' }} alt={editHotel.name} />
                    </Grid>
                    <Grid item ml={3}>
                      <IconButton onClick={() => hotelId && deleteOldImage(hotelId)}>
                        <DeleteForeverSharpIcon sx={{ color: 'rgba(230,17,17,0.87)' }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                {state.image && state.image instanceof File && (
                  <Grid container marginLeft={3} alignItems="center">
                    <Grid item>
                      <img src={URL.createObjectURL(state.image)} style={{ width: '100px' }} alt={editHotel.name} />
                    </Grid>
                    <Grid item ml={3}>
                      <IconButton onClick={deleteImage}>
                        <DeleteForeverSharpIcon sx={{ color: 'rgba(230,17,17,0.87)' }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  color="success"
                  size="small"
                  variant="contained"
                  loading={loading}
                  sx={{ background: '#0E8388' }}
                >
                  {isEdit ? t('edit') : t('create')}
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default HotelForm;
