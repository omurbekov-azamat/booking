import React, { useState } from 'react';
import { Box, Card, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { ApartmentMutation, ImgType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { selectApartmentError, selectLoadingCreateApartment } from './apartmentSlice';
import Button from '@mui/material/Button';
import { createApartment } from './apartmentThunks';

const ApartmentForm = () => {
  const [state, setState] = useState<ApartmentMutation>({
    roomTypeId: '',
    hotelId: '',
    description: '',
    images: [],
    price: {
      from: 0,
      till: 0,
    },
    place: 0,
    aircon: false,
    bath: false,
    balcony: false,
    food: false,
    family: false,
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
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
          roomTypeId: '6447a4f33285c6710e415c80',
        }),
      );
      await navigate('/hotels/' + id);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="div" variant="h5" textTransform="capitalize" color="salmon" sx={{ mt: 2 }}>
          {'create Apartment'}
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
              <Grid container justifyContent={'space-around'}>
                <h3>Price</h3>
                <Grid item xs={3}>
                  <TextField
                    type={'number'}
                    label={'From'}
                    name="from"
                    autoComplete="current-from"
                    value={state.price.from}
                    onChange={inputChangeHandler}
                    required
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    type={'number'}
                    inputProps={{ min: state.price.from + 1 }}
                    label={'Till'}
                    name="till"
                    autoComplete="current-till"
                    value={state.price.till}
                    onChange={inputChangeHandler}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <TextField
                label={'Description'}
                type="text"
                name="description"
                autoComplete="current-description"
                value={state.description}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <Card sx={{ mt: 5, p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={state.aircon} onChange={handleChange} name="aircon" color="primary" />
                      }
                      label="Air conditioning"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={<Checkbox checked={state.bath} onChange={handleChange} name="bath" color="primary" />}
                      label="Bath"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={state.balcony} onChange={handleChange} name="balcony" color="primary" />
                      }
                      label="Balcony"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={<Checkbox checked={state.food} onChange={handleChange} name="food" color="primary" />}
                      label="Food"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={state.family} onChange={handleChange} name="family" color="primary" />
                      }
                      label="Family-friendly"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={<Checkbox checked={state.towel} onChange={handleChange} name="towel" color="primary" />}
                      label="Towels"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={<Checkbox checked={state.wifi} onChange={handleChange} name="wifi" color="primary" />}
                      label="Wi-Fi"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={<Checkbox checked={state.tv} onChange={handleChange} name="tv" color="primary" />}
                      label="TV"
                    />
                  </Grid>
                </Grid>
              </Card>
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
                    <Button onClick={onClickAdd} variant="contained" color="success">
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs>
                    {state.images?.map((item, index) => (
                      <Grid container key={index}>
                        <Grid item>
                          <Typography>{item.name}</Typography>
                          <button onClick={() => deleteImg(index)}>delete</button>
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
