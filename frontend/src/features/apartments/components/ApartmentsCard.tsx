import React from 'react';
import { IApartment } from '../../../types';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  apartment: IApartment;
}

const ApartmentsCard: React.FC<Props> = ({ apartment }) => {
  return (
    <>
      {/*<Card sx={{ maxWidth: '100%', height: '100%' }}>*/}
      {/*  <CardActionArea>*/}
      {/*    <CardMedia component="img" height="140" image={cardImage} alt={hotel.name} />*/}
      {/*    <CardContent>*/}
      {/*      <Typography gutterBottom variant="h5" align="center">*/}
      {/*        {apartment.hotelId.name}*/}
      {/*      </Typography>*/}
      {/*      <Typography gutterBottom variant="h5" align="center">*/}
      {/*        {apartment.roomTypeId.name}*/}
      {/*      </Typography>*/}

      {/*        <Typography color={'grey'}>{t('founding') + ' ' + hotel.founding}</Typography>*/}
      {/*        <Typography color={'grey'}>{t('lowestPrice') + ' ' + hotel.lowestPrice.dollar + ' USD'}</Typography>*/}

      {/*    </CardContent>*/}
      {/*  </CardActionArea>*/}
      {/*  <Box>*/}
      {/*    <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>*/}
      {/*      {(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (*/}
      {/*        <Button variant="contained" size="medium" onClick={() => navigate('/my-cabinet/edit/' + hotel._id)}>*/}
      {/*          {t('edit')}*/}
      {/*        </Button>*/}
      {/*      )}*/}

      {/*      {(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (*/}
      {/*        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDeleteBtnClick}>*/}
      {/*          {t('delete')}*/}
      {/*        </Button>*/}
      {/*      )}*/}

      {/*      {(user?.role === 'admin' || user?.role === 'director') && !hotel.isPublished && (*/}
      {/*        <Button variant="outlined" color="error" sx={{ fontSize: 11 }} onClick={onPublishBtnClick}>*/}
      {/*          {t('publish')}*/}
      {/*        </Button>*/}
      {/*      )}*/}
      {/*    </Stack>*/}
      {/*  </Box>*/}
      {/*  <Box textAlign="center">*/}
      {/*    <Typography color="red">{!hotel.isPublished && 'Un publish'}</Typography>*/}
      {/*  </Box>*/}
      {/*</Card>*/}
    </>
  );
};

export default ApartmentsCard;
