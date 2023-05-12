import React, { MouseEventHandler, useEffect } from 'react';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { getFavoriteHotels } from '../hotelsThunks';
import { changeFavorites, reAuthorization } from '../../users/usersThunks';
import { selectFavoriteSuccess, selectUser, setFavoriteSuccessNull } from '../../users/usersSlice';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Hotel } from '../../../types';
import { useSnackbar } from 'notistack';

interface Props {
  hotel: Hotel;
  onDeleteBtnClick?: MouseEventHandler;
  onPublishBtnClick?: MouseEventHandler;
}

const HotelsCard: React.FC<Props> = ({ hotel, onDeleteBtnClick, onPublishBtnClick }) => {
  const dispatch = useAppDispatch();
  const favoriteSuccess = useAppSelector(selectFavoriteSuccess);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { t, i18n } = useTranslation();
  const cardImage = apiURL + '/' + hotel.image;

  const favorite = user?.role === 'user' && user.favorites.includes(hotel._id);

  useEffect(() => {
    if (favoriteSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(favoriteSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(favoriteSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setFavoriteSuccessNull());
  }, [favoriteSuccess, i18n.language, dispatch, enqueueSnackbar]);

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
