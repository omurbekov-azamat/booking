import React, { useState } from 'react';
import { fetchHotels, fetchUnPublishedHotels, removeHotel, togglePublishedHotel } from '../../hotels/hotelsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import HotelsCard from '../../hotels/components/HotelsCard';
import { useTranslation } from 'react-i18next';
import { Hotel } from '../../../types';

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
          <Grid item key={hotel._id} xs={12} sm={12} md={6} lg={6} xl={6} alignItems="stretch">
            <HotelsCard
              hotel={hotel}
              key={hotel._id}
              isNeedButtons={true}
              onPublishBtnClick={() => unPublishButton(hotel._id)}
              onDeleteBtnClick={() => handleClick(hotel._id)}
            />
            <Dialog open={open} onClose={handleCancel}>
              <DialogTitle>{t('warning')}</DialogTitle>
              <DialogContent>{t('warningHotelRemove')}</DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  {t('cancel')}
                </Button>
                <Button onClick={() => handleConfirm(hotelId)} color="primary">
                  {t('confirm')}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default MyHotels;
