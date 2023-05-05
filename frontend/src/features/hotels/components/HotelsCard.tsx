import React, { MouseEventHandler } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { Hotel } from '../../../types';

interface Props {
  hotel: Hotel;
  onHotelClick: MouseEventHandler;
  onDeleteBtnClick?: MouseEventHandler;
  onPublishBtnClick?: MouseEventHandler;
}

const HotelsCard: React.FC<Props> = ({ hotel, onHotelClick, onDeleteBtnClick, onPublishBtnClick }) => {
  const cardImage = apiURL + '/' + hotel.image;
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea onClick={onHotelClick}>
        <CardMedia component="img" height="140" image={cardImage} alt={hotel.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {hotel.name}
          </Typography>
          <Box textAlign="center">
            <Rating name="read-only" value={hotel.star} precision={0.5} readOnly />
          </Box>
          <Box textAlign="center">
            <Typography color={'grey'}>{t('founding') + ' ' + hotel.founding}</Typography>
            <Typography color={'grey'}>{t('lowestPrice') + ' ' + hotel.lowestPrice.dollar + ' USD'}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
          {(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
            <Button variant="contained" size="medium" onClick={() => navigate('/my-cabinet/edit/' + hotel._id)}>
              {t('edit')}
            </Button>
          )}

          {(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDeleteBtnClick}>
              {t('delete')}
            </Button>
          )}

          {(user?.role === 'admin' || user?.role === 'director') && !hotel.isPublished && (
            <Button variant="outlined" color="error" sx={{ fontSize: 11 }} onClick={onPublishBtnClick}>
              {t('publish')}
            </Button>
          )}
        </Stack>
      </Box>

      <Box textAlign="center">
        <Typography color="red">{!hotel.isPublished && 'Un publish'}</Typography>
      </Box>
    </Card>
  );
};

export default HotelsCard;
