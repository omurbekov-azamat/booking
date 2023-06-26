import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';
import { selectLoadingRemoveApartment } from '../apartmentSlice';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Box, Button, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { apiURL, placeHolderImg } from '../../../constants';
import { LoadingButton } from '@mui/lab';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import type { IApartment } from '../../../types';

interface Props {
  apartment: IApartment;
  isNeedButtons?: true;
  onDeleteBtnClick: MouseEventHandler;
}

const ApartmentsCard: React.FC<Props> = ({ apartment, isNeedButtons, onDeleteBtnClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currency = useAppSelector(selectCurrency);
  const user = useAppSelector(selectUser);
  const loadingDeleteApartment = useAppSelector(selectLoadingRemoveApartment);

  const cardImage = apiURL + '/' + apartment.images[0];

  return (
    <>
      <Card sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea onClick={() => navigate('/my-cabinet/apartments/' + apartment._id)}>
          <LazyLoadImage
            alt={apartment.hotelId.name}
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
            {apartment.roomTypeId && (
              <Typography gutterBottom variant="h5" align="center" textTransform="capitalize">
                {i18n.language === 'en' ? apartment.roomTypeId.name.en : apartment.roomTypeId.name.ru}
              </Typography>
            )}
            <Typography sx={{ color: 'grey', textAlign: 'center' }}>
              {t('price') + ': ' + (currency === 'kgs' ? apartment?.price.kgs + ' KGS' : apartment?.price.usd + ' USD')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ marginTop: 'auto', marginBottom: '12px' }}>
          <Stack direction="row" spacing={2} justifyContent="space-around" m={1} height="100%">
            {isNeedButtons &&
              (user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId.userId) && (
                <Tooltip title={t('edit')} placement="top">
                  <Button size="small" onClick={() => navigate('/my-cabinet/edit-apartment/' + apartment._id)}>
                    <EditIcon sx={{ color: '#05BFDB' }} />
                  </Button>
                </Tooltip>
              )}
            {isNeedButtons &&
              (user?.role === 'admin' || user?.role === 'director' || user?._id === apartment.hotelId.userId) && (
                <Tooltip title={t('delete')} placement="top">
                  <LoadingButton
                    loading={loadingDeleteApartment === apartment._id}
                    size="small"
                    onClick={onDeleteBtnClick}
                  >
                    <DeleteIcon sx={{ color: '#CD1818' }} />
                  </LoadingButton>
                </Tooltip>
              )}
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default ApartmentsCard;
