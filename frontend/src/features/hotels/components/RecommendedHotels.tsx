import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { getRecommendedHotels } from '../hotelsThunks';

const RecommendedHotels = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecommendedHotels());
  }, [dispatch]);
  return <div>Recommended hotels</div>;
};

export default RecommendedHotels;
