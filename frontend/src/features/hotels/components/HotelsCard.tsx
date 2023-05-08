import React, { MouseEventHandler } from 'react';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { getFavoriteHotels } from '../hotelsThunks';
import { changeFavorites, reAuthorization } from '../../users/usersThunks';
import { selectUser } from '../../users/usersSlice';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Hotel } from '../../../types';

interface Props {
  hotel: Hotel;
  onDeleteBtnClick?: MouseEventHandler;
  onPublishBtnClick?: MouseEventHandler;
}

const HotelsCard: React.FC<Props> = ({ hotel, onDeleteBtnClick, onPublishBtnClick }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const cardImage = apiURL + '/' + hotel.image;

  const favorite = user?.role === 'user' && user.favorites.includes(hotel._id);

  const onClickFavorite = async (id: string) => {
    if (!favorite) {
      await dispatch(changeFavorites({ addHotel: id }));
      await dispatch(reAuthorization());
      await enqueueSnackbar(t('addToFavorite'), { variant: 'success' });
    } else {
      await dispatch(changeFavorites({ deleteHotel: id }));
      await dispatch(reAuthorization());
      await dispatch(getFavoriteHotels());
      await enqueueSnackbar(t('removeFavorite'), { variant: 'success' });
    }
  };

  const onClickCard = async (id: string) => {
    await navigate('/hotels/' + id);
  };

  return (
    <Card sx={{ maxWidth: '100%', height: '100%' }}>
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
      <SnackbarProvider />
      <CardActionArea onClick={() => onClickCard(hotel._id)}>
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
