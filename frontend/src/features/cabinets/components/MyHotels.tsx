import React from 'react';
import { fetchHotels, removeHotel, togglePublishedHotel } from '../../hotels/hotelsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { Grid } from '@mui/material';
import HotelsCard from '../../hotels/components/HotelsCard';
import { Hotel } from '../../../types';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const unPublishButton = async (id: string) => {
    await dispatch(togglePublishedHotel(id));
    await dispatch(fetchHotels(user?._id));
  };

  const deleteButton = async (id: string) => {
    await dispatch(removeHotel(id));
    await dispatch(fetchHotels(user?._id));
  };

  return (
    <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
      {hotels.map((hotel) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={hotel._id} alignItems="stretch">
            <HotelsCard
              hotel={hotel}
              key={hotel._id}
              isNeedButtons={true}
              onPublishBtnClick={() => unPublishButton(hotel._id)}
              onDeleteBtnClick={() => deleteButton(hotel._id)}
            />
            ;
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MyHotels;
