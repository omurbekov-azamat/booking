import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchOneHotelLoading, selectOneHotel } from '../hotelsSlice';
import { Hotel, HotelMutation } from '../../../types';
import HotelForm from './HotelForm';
import { fetchOneHotel } from '../hotelsThunks';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const EditHotel = () => {
  const currentHotel = useAppSelector(selectOneHotel) as Hotel;
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const loading = useAppSelector(selectFetchOneHotelLoading);

  let editedHotel: HotelMutation | undefined;

  if (currentHotel) {
    editedHotel = {
      name: currentHotel.name,
      city: currentHotel.city,
      address: currentHotel.address,
      star: currentHotel.star.toString(),
      image: currentHotel.image,
      parking: currentHotel.parking,
      petFriendly: currentHotel.petFriendly,
      swimmingPool: currentHotel.swimmingPool,
      nonSmokingRooms: currentHotel.nonSmokingRooms,
      founding: currentHotel.founding,
      type: currentHotel.type,
      lowestPrice: {
        som: currentHotel.lowestPrice.som,
        dollar: currentHotel.lowestPrice.dollar,
      },
    };
  }

  useEffect(() => {
    dispatch(fetchOneHotel(id));
  }, [id, dispatch]);

  return <>{loading ? <CircularProgress /> : <HotelForm editedHotel={editedHotel} isEdit={true} />}</>;
};

export default EditHotel;
