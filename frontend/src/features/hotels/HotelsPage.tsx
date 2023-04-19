import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels } from './hotelsThunks';
import { selectHotels } from './hotelsSlice';
import { Grid } from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner';
import HotelsCard from './components/HotelsCard';
import SearchHotelForm from './components/SearchHotelForm';

const HotelsPage = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectHotels);
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);
  return (
    <>
      <SearchHotelForm />
      <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
        {hotels ? (
          hotels.map((el) => (
            <Grid item xs={12} sm={6} lg={4} key={Math.random()} alignItems="stretch">
              <HotelsCard image={el.image} title={el.name} rating={el.star} />
            </Grid>
          ))
        ) : (
          <Spinner />
        )}
      </Grid>
    </>
  );
};

export default HotelsPage;
