import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels, fetchNewPage } from './hotelsThunks';
import { selectHotels, selectLoading, selectPageOfHotels } from './hotelsSlice';
import { Grid } from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner';
import HotelsCard from './components/HotelsCard';
import SearchHotelForm from './components/SearchHotelForm';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import SearchField from './components/SearchField/SearchField';

const HotelsPage = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectHotels);
  const loading = useAppSelector(selectLoading);
  const page = useAppSelector(selectPageOfHotels);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const addMore = (pageNum: number) => {
    dispatch(fetchNewPage(pageNum));
  };

  return (
    <>
      <SearchField />
      <SearchHotelForm />
      <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
        {hotels ? (
          hotels.map((el) => (
            <Grid item xs={12} sm={6} lg={4} key={el._id} alignItems="stretch">
              <HotelsCard hotel={el} />
            </Grid>
          ))
        ) : (
          <Spinner />
        )}
        <Grid item container xs={12}>
          <LoadingButton style={{ margin: 'auto' }} variant="outlined" loading={loading} onClick={() => addMore(page)}>
            {t('more')}
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelsPage;
