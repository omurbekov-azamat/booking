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
import { useNavigate, useParams } from 'react-router-dom';
import { selectApartmentError, selectLoadingCreateApartment, selectRoomType } from '../apartmentSlice';
import { createApartment, fetchRoomType } from '../apartmentThunks';
import FileInput from '../../../components/UI/FileInput/FileInput';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PoolIcon from '@mui/icons-material/Pool';
import BalconyIcon from '@mui/icons-material/Balcony';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';

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
  const { id } = useParams();
  const roomType = useAppSelector(selectRoomType);

  useEffect(() => {
    dispatch(fetchRoomType());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'from' || name === 'till') {
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
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxName = event.target.name;
    const isChecked = event.target.checked;
    setState({ ...state, [checkboxName]: isChecked }); // update main state
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Typography component="div" variant="h5" textTransform="capitalize" color="salmon" sx={{ mt: 2 }}>
          {'create apartments'}
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
          <Grid container spacing={2} textAlign="center" direction="column">
            <Grid item xs>
              <TextField
                label={'Room area'}
                type={'number'}
                name="place"
                autoComplete="current-place"
                value={state.place}
                onChange={inputChangeHandler}
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                select
                label="Room type"
                name="roomTypeId"
                value={state.roomTypeId}
                onChange={inputChangeHandler}
                required
              >
                {roomType.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs>
              <Grid container justifyContent={'space-around'}>
                <h3>Price</h3>
                <Grid item xs={3}>
                  <TextField
                    type={'number'}
                    label={'Usd'}
                    name="usd"
                    autoComplete="current-usd"
                    value={state.price.usd}
                    onChange={inputChangeHandler}
                    required
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    type={'number'}
                    inputProps={{ min: state.price.usd + 1 }}
                    label={'Kgs'}
                    name="kgs"
                    autoComplete="current-kgs"
                    value={state.price.kgs}
                    onChange={inputChangeHandler}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <TextField
                label={'Описание на русском'}
                type="text"
                name="ru"
                autoComplete="current-description"
                value={state.description.ru}
                onChange={inputChangeHandler}
                required
              />
            </Grid>

            <Grid item xs>
              <TextField
                label={'Description in english'}
                type="text"
                name="en"
                autoComplete="current-description"
                value={state.description.en}
                onChange={inputChangeHandler}
                required
              />
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <Card sx={{ mt: 5, p: 3 }}>
                  <Typography>Доп услуги</Typography>
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
                    label="AC"
                    labelPlacement="end"
                    sx={{ textAlign: 'left', width: '90%' }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<PoolIcon />}
                        checkedIcon={<PoolIcon color="primary" />}
                        color="primary"
                        checked={state.bath}
                        onChange={handleCheckboxChange}
                        name="bath"
                      />
                    }
                    label="Bath"
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
                    label="Balcony"
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
                    label="Food"
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
                    label="Pet friendly"
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
                    label="Towels"
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
                    label="Wi-Fi"
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
                    label="TV"
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
                  <Grid item xs>
                    {state.images &&
                      state.images.length > 0 &&
                      state.images.map((image, index) => (
                        <Grid container key={index} marginLeft={3} mb={2}>
                          <img src={URL.createObjectURL(image)} style={{ width: '100px' }} alt={image.name} />
                          <Grid item>
                            <Typography>{image.name}</Typography>
                            <IconButton onClick={() => deleteImg(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
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
