import React, { useState } from 'react';
import { fetchHotels, fetchUnPublishedHotels, removeHotel, togglePublishedHotel } from '../../hotels/hotelsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import HotelsCard from '../../hotels/components/HotelsCard';
import { Hotel } from '../../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const unPublishButton = async (id: string) => {
    await dispatch(togglePublishedHotel(id));
    await dispatch(fetchUnPublishedHotels());
    await dispatch(fetchHotels(user?._id));
  };

  const [open, setOpen] = useState(false);
  const [hotelId, setHotelId] = useState('');

  const handleClick = (id: string) => {
    setHotelId(id);
    setOpen(true);
  };

  const handleConfirm = async (id: string) => {
    await dispatch(removeHotel(id));
    await dispatch(fetchHotels(user?._id));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
      {hotels.map((hotel) => {
        return (
          <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={hotel._id} alignItems="stretch">
              <HotelsCard
                hotel={hotel}
                key={hotel._id}
                isNeedButtons={true}
                onPublishBtnClick={() => unPublishButton(hotel._id)}
                onDeleteBtnClick={() => handleClick(hotel._id)}
              />
            </Grid>
            <Dialog open={open} onClose={handleCancel}>
              <DialogTitle>{t('warning')}</DialogTitle>
              <DialogContent>{t('warningHotelRemove')}</DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => handleConfirm(hotelId)} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      })}
    </Grid>
  );
};

export default MyHotels;
