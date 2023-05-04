import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels, fetchNewPage } from './hotelsThunks';
import { selectHotels, selectLoading, selectPageOfHotels } from './hotelsSlice';
import { Grid } from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner';
import HotelsCard from './components/HotelsCard';
import SearchHotelForm from './components/SearchHotelForm';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import SearchField from './components/SearchField/SearchField';

const HotelsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const hotels = useAppSelector(selectHotels);
  const page = useAppSelector(selectPageOfHotels);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const AddMore = (pageNum: number) => {
    dispatch(fetchNewPage(pageNum));
  };

  return (
    <>
      <SearchField />
      <SearchHotelForm />
      <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
        {hotels ? (
          hotels.map((el) => (
            <Grid item xs={12} sm={6} lg={4} key={Math.random()} alignItems="stretch">
              <HotelsCard hotel={el} onHotelClick={() => navigate('/hotels/' + el._id)} />
            </Grid>
          ))
        ) : (
          <Spinner />
        )}
        <Grid item container xs={12}>
          <LoadingButton style={{ margin: 'auto' }} variant="outlined" loading={loading} onClick={() => AddMore(page)}>
            {t('more')}
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelsPage;
