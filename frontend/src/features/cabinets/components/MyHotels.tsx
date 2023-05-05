import React from 'react';
import { Typography } from '@mui/material';
import { Hotel } from '../../../types';
import HotelsCard from '../../hotels/components/HotelsCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant={'h4'} component={'h4'}>
        {t('myHotels')}
      </Typography>

      {hotels.map((hotel) => {
        return <HotelsCard hotel={hotel} onHotelClick={() => navigate('/hotels/' + hotel._id)} key={hotel._id} />;
      })}
    </div>
  );
};

export default MyHotels;
