import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectLoadingMatch, selectSearchHotels } from '../../hotelsSlice';
import { useTranslation } from 'react-i18next';
import { fetchMatches } from '../../hotelsThunks';
import { HotelWithLabel } from '../../../../types';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const SearchField = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchResult = useAppSelector(selectSearchHotels);
  const autocomplete: HotelWithLabel[] = [];
  const navigate = useNavigate();
  const loadingSearchMatch = useAppSelector(selectLoadingMatch);
  searchResult.map((el) => autocomplete.push({ ...el, label: el.name }));
  const [match, setMatch] = useState('');

  const [selectedHotel, setSelectedHotel] = useState<HotelWithLabel | null>(null);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatch(event.target.value);
  };

  const onAutocompleteChange = (event: React.ChangeEvent<unknown>, value: HotelWithLabel | null) => {
    setSelectedHotel(value);
    setMatch('');
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedHotel) {
      navigate('/hotels/' + selectedHotel._id);
    }
  };

  useEffect(() => {
    dispatch(fetchMatches(match));
  }, [dispatch, match]);

  return (
    <form onClick={onSubmit}>
      <Grid container>
        <Grid item>
          <Autocomplete
            disablePortal
            options={autocomplete}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={onAutocompleteChange}
            value={selectedHotel}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} onChange={inputChangeHandler} label={t('search')} />}
          />
        </Grid>
        <Grid xs={1} item container alignItems="center">
          <LoadingButton loading={loadingSearchMatch} type="submit">
            <SearchIcon />
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchField;
