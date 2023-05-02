import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { apiURL } from '../../../constants';
import type { Hotel } from '../../../types';
import Parking from '../../../components/Icons/HotelIcons/Parking';
import PetFriendly from '../../../components/Icons/HotelIcons/PetFriendly';
import Pool from '../../../components/Icons/HotelIcons/Pool';
import Smoking from '../../../components/Icons/HotelIcons/Smoking';
import ApartmentsTable from '../../apartments/components/ApartmentsTable';

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
          <Typography variant="h6" component="p" textAlign={'center'}>
            {hotel.address}
          </Typography>
          <CardMedia component="img" height="auto" width="100" image={cardImage} title={hotel.name} />
          <Typography variant="body2" color="text.secondary" fontSize={24}>
            {hotel.description}
          </Typography>
          <Typography sx={{ my: 2 }} component="p">
            {t('extraServices')}
          </Typography>
          <Grid container rowSpacing={1}>
            <Grid item xs={12} md={6} xl={3}>
              <Parking parking={hotel.parking} />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <PetFriendly petFriendly={hotel.petFriendly} />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <Pool pool={hotel.swimmingPool} />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <Smoking noSmoking={hotel.nonSmokingRooms} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button variant={'outlined'} color={'success'}>
        Добавить номер
      </Button>
      <ApartmentsTable hotel={hotel} />
    </>
  );
};

export default HotelFull;
