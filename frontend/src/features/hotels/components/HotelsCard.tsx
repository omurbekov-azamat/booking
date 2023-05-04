import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchHotels, removeHotel, togglePublishedHotel } from '../hotelsThunks';
import { changeFavorites } from '../../users/usersThunks';
import { selectUser } from '../../users/usersSlice';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiURL } from '../../../constants';

interface Props {
  id: string;
  image: string;
  title: string;
  rating: number;
  onHotelClick: MouseEventHandler;
  publish: boolean;
  userId: string;
}

const HotelsCard: React.FC<Props> = ({ userId, publish, id, image, title, rating, onHotelClick }) => {
  const cardImage = apiURL + '/' + image;
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

  const favorite = user?.role === 'user' && user.favorites.includes(id);

  const onclickFavourite = (id: string) => {
    if (!favorite) {
      dispatch(changeFavorites({ addHotel: id }));
    } else {
      dispatch(changeFavorites({ deleteHotel: id }));
    }
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      {user && user.role === 'user' && favorite ? (
        <Box onClick={() => onclickFavourite(id)} textAlign="right">
          <FavoriteIcon color="error" />
        </Box>
      ) : (
        user?.role === 'user' && (
          <Box onClick={() => onclickFavourite(id)} textAlign="right">
            <FavoriteBorderIcon />
          </Box>
        )
      )}
      <CardActionArea onClick={onHotelClick}>
        <CardMedia component="img" height="140" image={cardImage} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {title}
          </Typography>
          <Box textAlign="center">
            <Rating name="read-only" value={rating} precision={0.5} readOnly />
          </Box>
        </CardContent>
      </CardActionArea>
      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
          {(user?.role === 'admin' || user?.role === 'director' || user?._id === userId) && (
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
        <Typography color="red">{!publish && 'Un publish'}</Typography>
      </Box>
    </Card>
  );
};

export default HotelsCard;
