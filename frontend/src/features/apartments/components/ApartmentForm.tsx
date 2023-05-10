import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
    description: '',
    images: [],
    price: {
      from: 0,
      till: 0,
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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxName = event.target.name;
    const isChecked = event.target.checked;
    setState({ ...state, [checkboxName]: isChecked }); // update main state

    if (isChecked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxName]); // add selected checkbox to the state
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((name) => name !== checkboxName)); // remove unchecked checkbox from the state
    }
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

            <Grid container spacing={3}>
              <Grid item xs>
                <Card sx={{ mt: 5, p: 3 }}>
                  <Typography style={{ textAlign: 'center' }} mb={2}>
                    Доп услуги
                  </Typography>
                  <Button variant="contained" onClick={handleOpen}>
                    выбрать
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Choose your options</DialogTitle>
                    <DialogContent>
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
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                      <Button onClick={handleClose} variant="contained">
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Grid container direction="column">
                    {selectedCheckboxes.map((item, index) => (
                      <Typography
                        key={index}
                        style={{
                          textAlign: 'left',
                          borderBottom: '1px solid black',
                          padding: '2px',
                          marginBottom: '2px',
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Grid>
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
