import React from 'react';
import RecommendedHotels from '../features/hotels/components/RecommendedHotels';
import BlockAdditionalServices from '../components/UI/BlockAdditionalServices/BlockAdditionalServices';
import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SwipeCityCards from '../components/UI/BlocksOnMainPage/SwipeCityCards';
import SwipePropertyTypeCards from '../components/UI/BlocksOnMainPage/SwipePropertyTypeCards';
import { HeaderStyles } from '../styles';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SwipePropertyTypeCards />
      <SwipeCityCards />
      <RecommendedHotels />
      <Typography variant="h5" textAlign="center" mt={3} style={HeaderStyles}>
        {t('specialOffersForYou')}
      </Typography>
      <Container maxWidth="lg">
        <BlockAdditionalServices />
      </Container>
    </>
  );
};

export default MainPage;
