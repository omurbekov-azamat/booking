import React, { MouseEventHandler } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchHotels, removeHotel, togglePublishedHotel } from '../hotelsThunks';
import { selectUser } from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { Hotel } from '../../../types';

interface Props {
  hotel: Hotel;
  onHotelClick: MouseEventHandler;
}

const HotelsCard: React.FC<Props> = ({ hotel, onHotelClick }) => {
  const cardImage = apiURL + '/' + hotel.image;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const unPublishButton = async () => {
    await dispatch(togglePublishedHotel(id));
    await dispatch(fetchHotels());
  };

  const deleteButton = async () => {
    await dispatch(removeHotel(id));
    await dispatch(fetchHotels());
  };

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
        </CardContent>
      </CardActionArea>

      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
          {(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
            <Button variant="contained" size="medium" onClick={() => navigate('/my-cabinet/edit/' + id)}>
              {t('edit')}
            </Button>
          )}

          {(user?.role === 'admin' || user?.role === 'director' || user?._id === userId) && (
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteButton}>
              {t('delete')}
            </Button>
          )}

          {(user?.role === 'admin' || user?.role === 'director') && !publish && (
            <Button variant="outlined" color="error" sx={{ fontSize: 11 }} onClick={unPublishButton}>
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
