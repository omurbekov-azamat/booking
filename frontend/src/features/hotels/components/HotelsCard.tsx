import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchHotels, getFavoriteHotels, removeHotel, togglePublishedHotel } from '../hotelsThunks';
import { changeFavorites, reAuthorization } from '../../users/usersThunks';
import { selectUser } from '../../users/usersSlice';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiURL } from '../../../constants';
import { Hotel } from '../../../types';

interface Props {
  hotel: Hotel;
}

const HotelsCard: React.FC<Props> = ({ hotel }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cardImage = apiURL + '/' + hotel.image;

  const unPublishButton = async () => {
    await dispatch(togglePublishedHotel(hotel._id));
    await dispatch(fetchHotels());
  };

  const deleteButton = async () => {
    await dispatch(removeHotel(hotel._id));
    await dispatch(fetchHotels());
  };

  const favorite = user?.role === 'user' && user.favorites.includes(hotel._id);

  const onClickFavorite = async (id: string) => {
    if (!favorite) {
      await dispatch(changeFavorites({ addHotel: id }));
      await dispatch(reAuthorization());
    } else {
      await dispatch(changeFavorites({ deleteHotel: id }));
      await dispatch(reAuthorization());
      await dispatch(getFavoriteHotels());
    }
  };

  const onClickCard = async (id: string) => {
    await navigate('/hotels/' + id);
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      {user && user.role === 'user' && favorite ? (
        <Box onClick={() => onClickFavorite(hotel._id)} textAlign="right">
          <FavoriteIcon color="error" />
        </Box>
      ) : (
        user?.role === 'user' && (
          <Box onClick={() => onClickFavorite(hotel._id)} textAlign="right">
            <FavoriteBorderIcon />
          </Box>
        )
      )}
      <CardActionArea onClick={() => onClickCard(hotel._id)}>
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
            <Button variant="contained" size="medium" onClick={() => navigate('/my-cabinet/edit/' + hotel._id)}>
              {t('edit')}
            </Button>
          )}
          {(user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteButton}>
              {t('delete')}
            </Button>
          )}
          {(user?.role === 'admin' || user?.role === 'director') && !hotel.isPublished && (
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
