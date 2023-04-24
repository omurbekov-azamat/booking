import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { apiURL } from '../../../constants';
import type { Hotel } from '../../../types';
import Parking from '../../../components/Icons/HotelIcons/Parking';
import PetFriendly from '../../../components/Icons/HotelIcons/PetFriendly';
import Pool from '../../../components/Icons/HotelIcons/Pool';
import Smoking from '../../../components/Icons/HotelIcons/Smoking';

interface Props {
  hotel: Hotel;
}

const HotelFull: React.FC<Props> = ({ hotel }) => {
  const cardImage = apiURL + '/' + hotel.image;
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" component="p" textAlign={'center'}>
            {hotel.name}
          </Typography>
          <Box textAlign={'center'}>
            <Rating name="read-only" value={hotel.star} precision={0.5} readOnly />
          </Box>
          <CardMedia component="img" height="auto" width="100" image={cardImage} title={hotel.name} />
          <Typography variant="body2" color="text.secondary" fontSize={24}>
            {hotel.description}
          </Typography>
          <Typography sx={{ my: 2 }} component="p">
            {t('extraServices')}
          </Typography>
          <Grid container xl>
            <Parking parking={hotel.parking} />
            <PetFriendly petFriendly={hotel.petFriendly} />
            <Pool pool={hotel.pool} />
            <Smoking noSmoking={hotel.smoking} />
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default HotelFull;
