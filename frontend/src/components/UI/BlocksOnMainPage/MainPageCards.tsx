import React from 'react';
import MainPageCard from './MainPageCard';
import { Grid } from '@mui/material';
import { BlockOnMainPage } from '../../../types';

interface Props {
  props: {
    [key: string]: BlockOnMainPage[];
  };
  city?: boolean;
  type?: boolean;
}

const MainPageCards: React.FC<Props> = ({ props, city, type }) => {
  const cities = Object.values(props).flat();
  return (
    <Grid container spacing={2}>
      {cities.map((item) => (
        <MainPageCard key={item.name} item={item} city={city} type={type} />
      ))}
    </Grid>
  );
};

export default MainPageCards;
