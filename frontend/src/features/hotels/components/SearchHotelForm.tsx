import React, { useState } from 'react';
import { fetchHotels, fetchSearchedHotels } from '../hotelsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchSearchedHotelsLoading } from '../hotelsSlice';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormGroup, Grid, Menu, Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SelectCities from '../../../components/UI/SelecetCities/SelectCities';
import ListFacilities from '../../../components/UI/ListFacilities/ListFacilities';
import { SearchData } from '../../../types';

const SearchHotelForm = () => {
  const dispatch = useAppDispatch();
  const loadingSearch = useAppSelector(selectFetchSearchedHotelsLoading);
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [state, setState] = useState<SearchData>({
    city: '',
    nonSmokingRooms: false,
    parking: false,
    swimmingPool: false,
    petFriendly: false,
    star: 5,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setState((prev) => ({ ...prev, [name]: checked }));
  };

  const onClickClearButton = async () => {
    await setState({
      city: '',
      nonSmokingRooms: false,
      parking: false,
      swimmingPool: false,
      petFriendly: false,
      star: 5,
    });
    await dispatch(fetchHotels());
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchSearchedHotels(state));
  };

  return (
    <Box component="form" mt={5} onSubmit={submitFormHandler} textAlign="center">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <SelectCities onChange={inputChangeHandler} name="city" label={t('whereAreYouGoing')} value={state.city} />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={1} xl={1}>
          <ListFacilities onChange={handleChangeCheckBox} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <Button
            onClick={handleClick}
            sx={{
              color: 'grey',
              height: '56px',
              border: '1px solid lightgrey',
              textTransform: 'capitalize',
              fontSize: '18px',
            }}
          >
            {t('propertyRating')}
          </Button>
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <FormGroup sx={{ p: 1 }}>
              <Rating
                name="simple-controlled"
                value={state.star}
                onChange={(event, newValue) => {
                  const value = newValue ? newValue : 0;
                  setState((prev) => ({ ...prev, star: value }));
                }}
              />
            </FormGroup>
          </Menu>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={1} xl={1}>
          <LoadingButton variant="outlined" color="success" sx={{ p: 1.5 }} type="submit" loading={loadingSearch}>
            {t('search')}
          </LoadingButton>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <LoadingButton
            variant="outlined"
            color="error"
            sx={{ p: 1.5 }}
            onClick={onClickClearButton}
            disabled={loadingSearch}
          >
            {t('clearFilter')}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchHotelForm;
