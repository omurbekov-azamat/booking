import React from 'react';
import { Typography } from '@mui/material';
import HotelsCard from '../../hotels/components/HotelsCard';
import { useTranslation } from 'react-i18next';
import { Hotel } from '../../../types';

interface Props {
  hotels: Hotel[];
}

const MyHotels: React.FC<Props> = ({ hotels }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant={'h4'} component={'h4'}>
        {t('myHotels')}
      </Typography>
      {hotels.map((hotel) => {
        return <HotelsCard hotel={hotel} key={hotel._id} />;
      })}
    </>
  );
};

export default MyHotels;
