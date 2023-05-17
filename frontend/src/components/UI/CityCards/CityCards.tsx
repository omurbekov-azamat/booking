import React from 'react';
import CityCard from './CityCard';
import { Grid } from '@mui/material';
import { CityOnMainPage } from '../../../types';

interface Props {
  props: {
    [key: string]: CityOnMainPage[];
  };
}

const CityCards: React.FC<Props> = ({ props }) => {
  const cities = Object.values(props).flat();
  return (
    <Grid container spacing={2}>
      {cities.map((item) => (
        <CityCard key={item.name} item={item} />
      ))}
    </Grid>
  );
};

export default CityCards;
