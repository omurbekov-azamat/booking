import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getRecommendedHotels } from '../hotelsThunks';
import { selectFetchRecommendedHotelsLoading, selectRecommendedHotels } from '../hotelsSlice';
import { Grid } from '@mui/material';
import HotelsCard from './HotelsCard';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Box from '@mui/material/Box';
import { HeaderStyles, mainBlocksBorderStyles } from '../../../styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const RecommendedHotels = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const recommendedHotels = useAppSelector(selectRecommendedHotels);
  const fetchRecommendedHotelsLoading = useAppSelector(selectFetchRecommendedHotelsLoading);

  useEffect(() => {
    dispatch(getRecommendedHotels());
  }, [dispatch]);
  return (
    <Box style={mainBlocksBorderStyles}>
      <Typography mb={2} style={HeaderStyles} variant="h4">
        {t('bestHotels')}
      </Typography>
      {fetchRecommendedHotelsLoading && <Spinner />}
      <Grid container spacing={2} alignItems="stretch">
        {recommendedHotels &&
          recommendedHotels.map((el) => (
            <Grid item xs={12} sm={6} lg={4} key={Math.random()} alignItems="stretch">
              <HotelsCard hotel={el} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default RecommendedHotels;
