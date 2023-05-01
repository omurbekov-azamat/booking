import React, { MouseEventHandler } from 'react';
import { Typography } from '@mui/material';
import { Hotel } from '../../../types';
import HotelsCard from '../../hotels/components/HotelsCard';

interface Props {
  hotels: Hotel[];
  onHotelClick: MouseEventHandler;
}

const MyHotels: React.FC<Props> = ({ hotels, onHotelClick }) => {
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
            onHotelClick={onHotelClick}
            key={hotel._id}
          />
        );
      })}
    </div>
  );
};

export default MyHotels;
