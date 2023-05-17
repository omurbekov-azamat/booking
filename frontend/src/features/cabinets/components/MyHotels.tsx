import React from 'react';
import { Grid } from '@mui/material';
import HotelsCard from '../../hotels/components/HotelsCard';
import { Hotel } from '../../../types';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  return (
    <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
      {hotels.map((hotel) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={hotel._id} alignItems="stretch">
            <HotelsCard hotel={hotel} key={hotel._id} isNeedButtons={true} />;
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MyHotels;
