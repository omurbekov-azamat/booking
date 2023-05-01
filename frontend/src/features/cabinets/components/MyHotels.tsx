import React from 'react';
import { Typography } from '@mui/material';
import { Hotel } from '../../../types';
import HotelsCard from '../../hotels/components/HotelsCard';
import { useNavigate } from 'react-router-dom';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant={'h4'} component={'h4'}>
        Мои отели
      </Typography>

      {hotels.map((hotel) => {
        return (
          <HotelsCard
            id={hotel._id}
            publish={hotel.isPublished}
            userId={hotel.userId}
            image={hotel.image}
            title={hotel.name}
            rating={hotel.star}
            onHotelClick={() => navigate('/hotels/' + hotel._id)}
            key={hotel._id}
          />
        );
      })}
    </div>
  );
};

export default MyHotels;
