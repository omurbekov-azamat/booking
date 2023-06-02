import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOneHotel } from './hotelsThunks';
import HotelFull from './components/HotelFull';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchOneHotelLoading, selectOneHotel } from './hotelsSlice';
import { fetchComments } from '../comments/commentsThunks';
import { selectComments } from '../comments/commentsSlice';

const HotelPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const fetchOneHotelLoading = useAppSelector(selectFetchOneHotelLoading);
  const hotel = useAppSelector(selectOneHotel);
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchOneHotel(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return fetchOneHotelLoading ? <Spinner /> : <>{hotel && <HotelFull hotel={hotel} comments={comments} />}</>;
};

export default HotelPage;
