import React from 'react';
import { IApartment } from '../../../types';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';
import { removeApartment } from '../apartmentThunks';
import { selectLoadingRemoveApartment } from '../apartmentSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  apartment: IApartment;
  isNeedButtons?: true;
}

const ApartmentsCard: React.FC<Props> = ({ apartment, isNeedButtons }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currency = useAppSelector(selectCurrency);
  const user = useAppSelector(selectUser);
  const loadingDeleteApartment = useAppSelector(selectLoadingRemoveApartment);

  const cardImage = apiURL + '/' + apartment.images[0];

  const deleteApartment = async (id: string) => {
    await dispatch(removeApartment(id));
  };

  return (
    <>
      <Card sx={{ maxWidth: '100%', height: '100%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={cardImage}
            alt={i18n.language === 'en' ? apartment.roomTypeId.name.en : apartment.roomTypeId.name.ru}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" color={'grey'}>
              {apartment.hotelId.name}
            </Typography>
            <Typography gutterBottom variant="h5" align="center">
              {i18n.language === 'en' ? apartment.roomTypeId.name.en : apartment.roomTypeId.name.ru}
            </Typography>
            <Typography color={'grey'}>
              {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
            {isNeedButtons &&
              (user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId.userId) && (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => navigate('/my-cabinet/edit-apartment/' + apartment._id)}
                >
                  {t('edit')}
                </Button>
              )}
            {isNeedButtons &&
              (user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId.userId) && (
                <LoadingButton
                  loading={loadingDeleteApartment === apartment._id}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteApartment(apartment._id)}
                >
                  {t('delete')}
                </LoadingButton>
              )}
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default ApartmentsCard;
