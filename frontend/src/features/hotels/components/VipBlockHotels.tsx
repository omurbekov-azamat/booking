import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectHotels, selectLoading } from '../hotelsSlice';
import { fetchHotels } from '../hotelsThunks';
import { Hotel } from '../../../types';
import HotelsCard from './HotelsCard';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const VipBlockHotels = () => {
  const [vipHotels, setVipHotels] = useState<Hotel[]>([]);
  const [businessHotels, setBusinessHotels] = useState<Hotel[]>([]);

  const hotels = useAppSelector(selectHotels);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  useEffect(() => {
    const vipHotels = hotels.filter((hotel) => hotel.status === 'premium');
    const shuffledVipHotels = vipHotels.sort(() => 0.5 - Math.random());
    setVipHotels(shuffledVipHotels.slice(0, 6));

    const businessHotels = hotels.filter((hotel) => hotel.status === 'business');
    const shuffledBusinessHotels = businessHotels.sort(() => 0.5 - Math.random());
    setBusinessHotels(shuffledBusinessHotels.slice(0, 6));
  }, [hotels]);

  return (
    <>
      <Box
        border={3}
        borderColor="black"
        borderRadius={5}
        p={2}
        mt={2}
        sx={{ position: 'relative', minHeight: '300px', background: '#78d5d8' }}
      >
        <Box textAlign="center" fontWeight="bold" mt={2}>
          {t('bestHotels')}
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
              {vipHotels.map((hotel) => (
                <Grid item xs={12} sm={6} lg={4} key={hotel._id} alignItems="stretch">
                  <Box border={5} borderColor="gold" borderRadius={5} p={2} sx={{ height: '100%' }}>
                    <HotelsCard hotel={hotel} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
      <Box
        border={3}
        borderColor="gray"
        borderRadius={5}
        p={2}
        mt={2}
        sx={{ position: 'relative', minHeight: '300px', background: 'rgba(111,185,240,0.58)' }}
      >
        <Box textAlign="center" fontWeight="bold" mt={2}>
          {t('recommended')}
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
              {businessHotels.map((hotel) => (
                <Grid item xs={12} sm={6} lg={4} key={hotel._id} alignItems="stretch">
                  <Box border={5} borderColor="silver" borderRadius={5} p={2} sx={{ height: '100%' }}>
                    <HotelsCard hotel={hotel} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default VipBlockHotels;
