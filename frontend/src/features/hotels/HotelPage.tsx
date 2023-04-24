import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOneHotel } from './hotelsThunks';
import HotelFull from './components/HotelFull';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoading, selectOneHotel } from './hotelsSlice';

const HotelPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const loading = useAppSelector(selectLoading);
  const hotel = useAppSelector(selectOneHotel);

  useEffect(() => {
    dispatch(fetchOneHotel(id));
  }, [dispatch, id]);

  return loading ? <Spinner /> : <div>{hotel && <HotelFull hotel={hotel} />}</div>;
};

export default HotelPage;
