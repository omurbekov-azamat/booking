import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { ApartmentMutation, ImgType, IRoomType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  notistackShow,
  selectApartmentError,
  selectLoadingCreateApartment,
  selectOneApartment,
  selectRoomType,
} from '../apartmentSlice';
import { createApartment, fetchOneApartment, fetchRoomType, removeApartmentImage } from '../apartmentThunks';
import FileInput from '../../../components/UI/FileInput/FileInput';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BalconyIcon from '@mui/icons-material/Balcony';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import { fetchOneHotel } from '../../hotels/hotelsThunks';
import { apiURL } from '../../../constants';

const ApartmentForm = () => {
  const [state, setState] = useState<ApartmentMutation>({
    roomTypeId: '',
    hotelId: '',
    description: {
      ru: '',
      en: '',
    },
    images: [],
    price: {
      usd: 0,
      kgs: 0,
    },
    place: 0,
    AC: false,
    bath: false,
    balcony: false,
    food: false,
    petFriendly: false,
    towel: false,
    wifi: false,
    tv: false,
  });

  const [stateImg, setStateImg] = useState<ImgType>({
    image: null,
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectApartmentError);
  const loading = useAppSelector(selectLoadingCreateApartment);
  const navigate = useNavigate();
  const { id, idEditApartment } = useParams();
  const roomType = useAppSelector(selectRoomType);
  const oneApartment = useAppSelector(selectOneApartment);

  useEffect(() => {
    dispatch(fetchRoomType());
  }, [dispatch]);

  useEffect(() => {
    if (idEditApartment) {
      dispatch(fetchOneApartment(idEditApartment));
    }
  }, [dispatch, idEditApartment]);

  useEffect(() => {
    if (oneApartment) {
      if (id) {
        setState((prevState) => ({
          ...prevState,
          roomTypeId: oneApartment.roomTypeId._id,
          hotelId: id,
          description: oneApartment.description,
          price: oneApartment.price,
          place: oneApartment.place,
          AC: oneApartment.AC,
          bath: oneApartment.bath,
          balcony: oneApartment.balcony,
          food: oneApartment.food,
          petFriendly: oneApartment.petFriendly,
          towel: oneApartment.towel,
          wifi: oneApartment.wifi,
          tv: oneApartment.tv,
        }));
      }
    }
  }, [oneApartment, id, setState]);

  console.log(state);
  // console.log(oneApartment?.images);
  console.log(stateImg);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'usd' || name === 'kgs') {
      setState((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [name]: parseInt(value),
        },
      }));
    } else if (name === 'ru' || name === 'en') {
      setState((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          [name]: value,
        },
      }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setStateImg((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onClickAdd = async () => {
    if (stateImg.image) {
      const mass = state.images;
      await mass?.push(stateImg.image);
      await setState((prev) => ({ ...prev, images: mass }));
    }
  };

  const deleteImg = (index: number) => {
    const mass = state.images;
    mass?.splice(index, 1);
    setState({
      ...state,
      images: mass,
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      await dispatch(
        createApartment({
          ...state,
          hotelId: id,
        }),
      );
      await navigate('/hotels/' + id);
      await dispatch(fetchOneHotel(id));
      await dispatch(notistackShow(true));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxName = event.target.name;
    const isChecked = event.target.checked;
    setState({ ...state, [checkboxName]: isChecked });
  };

  const name = (name: IRoomType) => {
    if (name.name === 'single room') {
      return t('singleRoom');
    } else if (name.name === 'double room') {
      return t('doubleRoom');
    } else if (name.name === 'triple room') {
      return t('tripleRoom');
    }
  };

  const deleteOldImg = async (apartmentId: string, imageIndex: number) => {
    await dispatch(removeApartmentImage({ apartmentId, imageIndex }));
    await dispatch(fetchOneApartment(apartmentId));
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Typography component="div" variant="h5" textTransform="capitalize" color="salmon" sx={{ mt: 2 }}>
          {t('createApartment')}
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
          <Grid container spacing={2} textAlign="center" direction="column">
            <Grid item xs>
              <TextField
                label={t('roomArea')}
                type={'number'}
                name="place"
                autoComplete="current-place"
                onChange={inputChangeHandler}
                value={state.place}
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                select
                label={t('roomType')}
                name="roomTypeId"
                value={state.roomTypeId}
                onChange={inputChangeHandler}
                required
              >
                {roomType.map((option) => {
                  return (
                    <MenuItem key={option._id} value={option._id}>
                      {name(option)}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs>
              <Grid container justifyContent={'space-around'}>
                <h3>{t('price')}</h3>
                <Grid item xs={3}>
                  <TextField
                    type={'number'}
                    label={'Usd'}
                    name="usd"
                    autoComplete="current-usd"
                    onChange={inputChangeHandler}
                    value={state.price.usd}
                    required
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    type={'number'}
                    label={'Kgs'}
                    name="kgs"
                    autoComplete="current-kgs"
                    onChange={inputChangeHandler}
                    value={state.price.kgs}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <TextField
                label={t('descriptionInRu')}
                type="text"
                name="ru"
                autoComplete="current-description"
                value={state.description.ru}
                onChange={inputChangeHandler}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs>
              <TextField
                label={t('descriptionInEn')}
                type="text"
                name="en"
                autoComplete="current-description"
                value={state.description.en}
                onChange={inputChangeHandler}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <Card sx={{ mt: 5, p: 3 }}>
                  <Typography>{t('extraServices')}</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<AcUnitIcon />}
                        checkedIcon={<AcUnitIcon color="primary" />}
                        checked={state.AC}
                        onChange={handleCheckboxChange}
                        name="AC"
                        color="primary"
                      />
                    }
                    label={t('AC')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<BathtubIcon />}
                        checkedIcon={<BathtubIcon color="primary" />}
                        color="primary"
                        checked={state.bath}
                        onChange={handleCheckboxChange}
                        name="bath"
                      />
                    }
                    label={t('bath')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<BalconyIcon />}
                        checkedIcon={<BalconyIcon color="primary" />}
                        checked={state.balcony}
                        onChange={handleCheckboxChange}
                        name="balcony"
                        color="primary"
                      />
                    }
                    label={t('balcony')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<RestaurantIcon />}
                        checkedIcon={<RestaurantIcon color="primary" />}
                        checked={state.food}
                        onChange={handleCheckboxChange}
                        name="food"
                        color="primary"
                      />
                    }
                    label={t('food')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<PetsIcon />}
                        checkedIcon={<PetsIcon color="primary" />}
                        checked={state.petFriendly}
                        onChange={handleCheckboxChange}
                        name="petFriendly"
                        color="primary"
                      />
                    }
                    label={t('petFriendly')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<DryCleaningIcon />}
                        checkedIcon={<DryCleaningIcon color="primary" />}
                        checked={state.towel}
                        onChange={handleCheckboxChange}
                        name="towel"
                        color="primary"
                      />
                    }
                    label={t('towel')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<WifiIcon />}
                        checkedIcon={<WifiIcon color="primary" />}
                        checked={state.wifi}
                        onChange={handleCheckboxChange}
                        name="wifi"
                        color="primary"
                      />
                    }
                    label={t('wiFi')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<TvIcon />}
                        checkedIcon={<TvIcon color="primary" />}
                        checked={state.tv}
                        onChange={handleCheckboxChange}
                        name="tv"
                        color="primary"
                      />
                    }
                    label={t('tv')}
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                </Card>
              </Grid>
            </Grid>
            <Card sx={{ mt: 5, p: 3 }}>
              <Grid item xs>
                <FileInput
                  label={t('image')}
                  onChange={fileInputChangeHandler}
                  name="image"
                  type="images/*"
                  error={error}
                />
                <Grid container justifyContent={'end'} mt={3}>
                  <Grid item>
                    <IconButton onClick={onClickAdd}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                  <Grid container direction="column">
                    <Grid item xs>
                      {oneApartment?.images &&
                        idEditApartment &&
                        oneApartment.images.map((image, index) => (
                          <Grid container key={index} marginLeft={3} mb={2}>
                            <img src={apiURL + '/' + image} style={{ width: '100px' }} alt={image} />
                            <Grid item>
                              <IconButton onClick={() => deleteOldImg(idEditApartment, index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                    <Grid item xs>
                      {state.images &&
                        state.images.length > 0 &&
                        state.images.map((image, index) => (
                          <Grid container key={index} marginLeft={3} mb={2}>
                            <img src={URL.createObjectURL(image)} style={{ width: '100px' }} alt={image.name} />
                            <Grid item>
                              <IconButton onClick={() => deleteImg(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <Grid item xs>
              <LoadingButton type="submit" color="success" variant="contained" loading={loading}>
                {t('create')}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ApartmentForm;
