import React from 'react';
import { Grid, Typography } from '@mui/material';
import HotelsCard from '../../hotels/components/HotelsCard';
import { useTranslation } from 'react-i18next';
import { Hotel } from '../../../types';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant={'h4'} component={'h4'}>
        {t('myHotels')}
      </Typography>
      <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
        {hotels.map((hotel) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={Math.random()} alignItems="stretch">
              <HotelsCard hotel={hotel} key={hotel._id} />;
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MyHotels;
