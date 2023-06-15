import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';
import { fetchApartments, removeApartment } from '../apartmentThunks';
import { selectLoadingRemoveApartment } from '../apartmentSlice';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Box, Button, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { apiURL, placeHolderImg } from '../../../constants';
import { LoadingButton } from '@mui/lab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteIcon from '@mui/icons-material/Delete';
import type { IApartment } from '../../../types';

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
      <Card sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea onClick={() => navigate('/my-cabinet/apartments/' + apartment._id)}>
          <LazyLoadImage
            alt={i18n.language === 'en' ? apartment.roomTypeId.name.en : apartment.roomTypeId.name.ru}
            effect="blur"
            width="100%"
            height="auto"
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
            <Typography sx={{ color: 'grey', textAlign: 'center' }}>
              {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ marginTop: 'auto', marginBottom: '12px' }}>
          <Stack direction="row" spacing={2} justifyContent="space-around" m={1} height="100%">
            {isNeedButtons &&
              (user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId.userId) && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ background: '#05BFDB' }}
                  onClick={() => navigate('/my-cabinet/edit-apartment/' + apartment._id)}
                >
                  {t('edit')}
                </Button>
              )}
            {isNeedButtons &&
              (user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId.userId) && (
                <LoadingButton
                  loading={loadingDeleteApartment === apartment._id}
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ background: '#CD1818' }}
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
