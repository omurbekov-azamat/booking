import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectHotels } from '../hotelsSlice';
import { fetchHotels } from '../hotelsThunks';

const VipBlockHotels = () => {
  const hotels = useAppSelector(selectHotels);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  return (
    <>
      <Box
        border={3}
        borderColor="black"
        borderRadius={5}
        p={2}
        mt={2}
        sx={{ position: 'relative', minHeight: '300px' }}
      >
        <Box textAlign="center" fontWeight="bold" mt={2}>
          Best Hotels
        </Box>
        <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}></Grid>
      </Box>

      <Box
        border={3}
        borderColor="gray"
        borderRadius={5}
        p={2}
        mt={2}
        sx={{ position: 'relative', minHeight: '300px' }}
      >
        <Box textAlign="center" fontWeight="bold" mt={2}>
          Recommended
        </Box>
        <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}></Grid>
      </Box>
    </>
  );
};

export default VipBlockHotels;
