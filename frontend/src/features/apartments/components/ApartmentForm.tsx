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
import { ApartmentMutation, ImgType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  selectApartmentError,
  selectLoadingCreateApartment,
  selectLoadingEditApartment,
  selectLoadingFetchOneApartment,
  selectOneApartment,
} from '../apartmentSlice';
import { createApartment, editApartment, fetchOneApartment, removeApartmentImage } from '../apartmentThunks';
import FileInput from '../../../components/UI/FileInput/FileInput';
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
import Spinner from '../../../components/UI/Spinner/Spinner';
import { selectRoomTypes } from '../../roomTypes/roomTypesSlice';
import { fetchRoomTypes } from '../../roomTypes/roomTypesThunks';
import Resizer from 'react-image-file-resizer';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

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
  const loadingCreateApartment = useAppSelector(selectLoadingCreateApartment);
  const loadingFetchOneApartment = useAppSelector(selectLoadingFetchOneApartment);
  const navigate = useNavigate();
  const { id, idEditApartment } = useParams();
  const roomType = useAppSelector(selectRoomTypes);
  const oneApartment = useAppSelector(selectOneApartment);
  const loadingEditApartment = useAppSelector(selectLoadingEditApartment);
  const location = useLocation();

  const pathLocation = location.pathname;
  const parts = pathLocation.split('/');
  const locationEdit = parts[parts.length - 2];

  useEffect(() => {
    dispatch(fetchRoomTypes());
  }, [dispatch]);

  useEffect(() => {
    if (idEditApartment) {
      dispatch(fetchOneApartment(idEditApartment));
    }
  }, [dispatch, idEditApartment]);

  useEffect(() => {
    if (locationEdit === 'editApartment') {
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
    }
  }, [oneApartment, id, setState, locationEdit]);

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

      setStateImg((prev) => ({
        ...prev,
        [name]: image,
      }));
    }
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
    if (idEditApartment) {
      await dispatch(editApartment({ apartment: state, id: idEditApartment }));
      await navigate('/hotels/' + id);
    } else {
      if (id) {
        await dispatch(
          createApartment({
            ...state,
            hotelId: id,
          }),
        );
        await navigate('/hotels/' + id);
        await dispatch(fetchOneHotel(id));
      }
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxName = event.target.name;
    const isChecked = event.target.checked;
    setState({ ...state, [checkboxName]: isChecked });
  };

  const deleteOldImg = async (apartmentId: string, imageIndex: number) => {
    await dispatch(removeApartmentImage({ apartmentId, imageIndex }));
    await dispatch(fetchOneApartment(apartmentId));
  };

  return (
    <>
      {loadingFetchOneApartment && <Spinner />}
      <Container component="main" maxWidth="sm">
        <Typography
          component="div"
          variant="h5"
          textTransform="capitalize"
          color="salmon"
          sx={{ mt: 2 }}
          textAlign={'center'}
        >
          {t('editApartment')}
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
          <Grid container spacing={2} textAlign="center" direction="column">
            <Card sx={{ mt: 5, p: 3 }}>
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
              <Grid item xs mt={3}>
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
                        {option.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs mt={3}>
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

              <Grid item xs mt={3}>
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

              <Grid item xs mt={3}>
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
            </Card>

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
                      <DownloadSharpIcon fontSize="large" sx={{ color: 'rgba(17,92,23,0.87)' }} />
                      <Typography color={'rgba(17,92,23,0.87)'}>{t('download')}</Typography>
                    </IconButton>
                  </Grid>
                  <Grid container direction="column">
                    <Grid item xs>
                      {oneApartment?.images &&
                        idEditApartment &&
                        oneApartment.images.map((image, index) => (
                          <Grid container key={index} marginLeft={3} mb={2} alignItems={'center'}>
                            <img src={apiURL + '/' + image} style={{ width: '100px' }} alt={image} />
                            <Grid item ml={3}>
                              <IconButton onClick={() => deleteOldImg(idEditApartment, index)}>
                                <DeleteForeverSharpIcon sx={{ color: 'rgba(230,17,17,0.87)' }} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                    <Grid item xs>
                      {state.images &&
                        state.images.length > 0 &&
                        state.images.map((image, index) => (
                          <Grid container key={index} marginLeft={3} mb={2} alignItems={'center'}>
                            <img src={URL.createObjectURL(image)} style={{ width: '100px' }} alt={image.name} />
                            <Grid item ml={3}>
                              <IconButton onClick={() => deleteImg(index)}>
                                <DeleteForeverSharpIcon sx={{ color: 'rgba(230,17,17,0.87)' }} />
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
              <LoadingButton
                type="submit"
                color="success"
                variant="contained"
                loading={loadingCreateApartment || loadingEditApartment}
              >
                {idEditApartment ? t('edit') : t('create')}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ApartmentForm;
