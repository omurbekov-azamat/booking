import React from 'react';
import { IApartment } from '../../../types';
import { Box, Button, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import { apiURL, placeHolderImg } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';
import { fetchApartments, removeApartment } from '../apartmentThunks';
import { selectLoadingRemoveApartment } from '../apartmentSlice';
import { LoadingButton } from '@mui/lab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
  const location = useLocation();

  const cardImage = apiURL + '/' + apartment.images[0];

  const deleteApartment = async (id: string) => {
    await dispatch(removeApartment(id));

    if (location.pathname === '/my-cabinet') {
      await dispatch(fetchApartments({ userId: user?._id }));
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: '100%', height: '100%' }}>
        <CardActionArea onClick={() => navigate('/my-cabinet/apartments/' + apartment._id)}>
          <LazyLoadImage
            alt={i18n.language === 'en' ? apartment.roomTypeId.name.en : apartment.roomTypeId.name.ru}
            effect="blur"
            height="140px"
            src={cardImage}
            placeholderSrc={placeHolderImg}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" align="center" color={'grey'}>
              {apartment.hotelId.name}
            </Typography>
            <Typography gutterBottom variant="h5" align="center" textTransform="capitalize">
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
