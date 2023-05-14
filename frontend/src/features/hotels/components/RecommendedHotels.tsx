import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getRecommendedHotels } from '../hotelsThunks';
import { selectFetchRecommendedHotelsLoading, selectRecommendedHotels } from '../hotelsSlice';
import { Grid } from '@mui/material';
import HotelsCard from './HotelsCard';
import Spinner from '../../../components/UI/Spinner/Spinner';

const RecommendedHotels = () => {
  const dispatch = useAppDispatch();
  const recommendedHotels = useAppSelector(selectRecommendedHotels);
  const fetchRecommendedHotelsLoading = useAppSelector(selectFetchRecommendedHotelsLoading);

  useEffect(() => {
    dispatch(getRecommendedHotels());
  }, [dispatch]);
  return (
    <>
      {fetchRecommendedHotelsLoading && <Spinner />}
      <Grid container spacing={2} alignItems="stretch">
        {recommendedHotels &&
          recommendedHotels.map((el) => (
            <Grid item xs={12} sm={6} lg={4} key={Math.random()} alignItems="stretch">
              <HotelsCard hotel={el} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default RecommendedHotels;
