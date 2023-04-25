import React, { useState } from 'react';
import SelectCities from '../../../components/UI/SelecetCities/SelectCities';
import ListFacilities from '../../../components/UI/ListFacilities/ListFacilities';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SearchData } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { fetchSearchedHotels } from '../hotelsThunks';

const SearchHotelForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [state, setState] = useState<SearchData>({
    city: '',
    smoking: false,
    parking: false,
    pool: false,
    petFriendly: false,
  });

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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(fetchSearchedHotels(state));
  };

  return (
    <Box component="form" mt={5} onSubmit={submitFormHandler}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <SelectCities onChange={inputChangeHandler} name="city" label={t('whereAreYouGoing')} />
        </Grid>
        <Grid item xs={8} md={3} lg={3} xl={3}>
          <ListFacilities onChange={handleChangeCheckBox} width={200} />
        </Grid>
        <Grid item xs lg={1} xl={1}>
          <LoadingButton variant="outlined" color="success" sx={{ p: 1.5 }} type="submit">
            {t('search')}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchHotelForm;
