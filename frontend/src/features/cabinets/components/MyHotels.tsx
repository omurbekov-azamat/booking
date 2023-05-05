import React from 'react';
import { Typography } from '@mui/material';
import { Hotel } from '../../../types';
import HotelsCard from '../../hotels/components/HotelsCard';
import { useTranslation } from 'react-i18next';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant={'h4'} component={'h4'}>
        {t('myHotels')}
      </Typography>
      {hotels.map((hotel) => {
        return <HotelsCard key={hotel._id} hotel={hotel} />;
      })}
    </div>
  );
};

export default MyHotels;
