import React from 'react';
import { IApartment } from '../../../types';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';

interface Props {
  apartment: IApartment;
}

const ApartmentsCard: React.FC<Props> = ({ apartment }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useAppSelector(selectCurrency);
  const user = useAppSelector(selectUser);

  const cardImage = apiURL + '/' + apartment.images[0];

  return (
    <>
      <Card sx={{ maxWidth: '100%', height: '100%' }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={cardImage} alt={apartment.roomTypeId.name} />
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" color={'grey'}>
              {apartment.hotelId.name}
            </Typography>
            <Typography gutterBottom variant="h5" align="center">
              {apartment.roomTypeId.name}
            </Typography>
            <Typography color={'grey'}>
              {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
            {(user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId._id) && (
              <Button
                variant="contained"
                size="medium"
                onClick={() => navigate('/my-cabinet/edit-apartment/' + apartment._id)}
              >
                {t('edit')}
              </Button>
            )}

            {/*{(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (*/}
            {/*  <Button variant="outlined" startIcon={<DeleteIcon/>} onClick={onDeleteBtnClick}>*/}
            {/*    {t('delete')}*/}
            {/*  </Button>*/}
            {/*)}*/}
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default ApartmentsCard;
