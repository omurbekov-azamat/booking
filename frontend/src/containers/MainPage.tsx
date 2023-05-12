import React from 'react';
import RecommendedHotels from '../features/hotels/components/RecommendedHotels';
import BlockAdditionalServices from '../components/UI/BlockAdditionalServices/BlockAdditionalServices';
import { Container } from '@mui/material';

const MainPage = () => {
  return (
    <>
      <RecommendedHotels />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <BlockAdditionalServices />
      </Container>
    </>
  );
};

export default MainPage;
