import React, { MouseEventHandler } from 'react';
import { apiURL, placeHolderImg } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { selectLoadingRemoveHotel, selectLoadingTogglePublished } from '../hotelsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import { getFavoriteHotels } from '../hotelsThunks';
import { changeFavorites, reAuthorization } from '../../users/usersThunks';
import { selectUser } from '../../users/usersSlice';
import { Box, Card, CardActionArea, CardContent, Rating, Stack, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Hotel } from '../../../types';
import { LoadingButton } from '@mui/lab';
import { selectCurrency } from '../../currency/currencySlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
  hotel: Hotel;
  onDeleteBtnClick?: MouseEventHandler;
  onPublishBtnClick?: MouseEventHandler;
  isNeedButtons?: true;
}

const HotelsCard: React.FC<Props> = ({ hotel, onDeleteBtnClick, onPublishBtnClick, isNeedButtons }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const loadingDeleteHotel = useAppSelector(selectLoadingRemoveHotel);
  const loadingPublishHotel = useAppSelector(selectLoadingTogglePublished);
  const currency = useAppSelector(selectCurrency);
  const { t } = useTranslation();
  const cardImage = apiURL + '/' + hotel.image;

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
    <Card sx={{ maxWidth: '100%', height: '100%' }}>
      {user &&
        user.isVerified &&
        (user.role === 'user' && favorite ? (
          <Box onClick={() => onClickFavorite(hotel._id)} textAlign="right">
            <FavoriteIcon color="error" />
          </Box>
        ) : (
          user.role === 'user' && (
            <Box onClick={() => onClickFavorite(hotel._id)} textAlign="right">
              <FavoriteBorderIcon />
            </Box>
          )
        ))}
      <CardActionArea onClick={() => onClickCard(hotel._id)}>
        <LazyLoadImage
          alt={hotel.name}
          width="100%"
          height="140px"
          effect="blur"
          style={{ objectFit: 'cover' }}
          src={cardImage}
          placeholderSrc={placeHolderImg}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {hotel.name}
          </Typography>
          <Box textAlign="center">
            <Rating name="read-only" value={hotel.star} precision={0.5} readOnly />
          </Box>
          <Box textAlign="center">
            <Typography color={'grey'}>{t('founding') + ' ' + hotel.founding}</Typography>
            <Typography color={'grey'}>
              {t('lowestPrice') +
                ' ' +
                (currency === 'kgs' ? hotel.lowestPrice.som + ' KGS' : hotel.lowestPrice.dollar + ' USD')}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
          {isNeedButtons && (user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
            <LoadingButton
              disabled={loadingDeleteHotel ? loadingDeleteHotel === hotel._id : false}
              variant="contained"
              size="small"
              sx={{ background: '#05BFDB' }}
              onClick={() => navigate('/my-cabinet/edit-hotel/' + hotel._id)}
            >
              {t('edit')}
            </LoadingButton>
          )}
          {isNeedButtons && (user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
            <LoadingButton
              disabled={loadingPublishHotel ? loadingPublishHotel === hotel._id : false}
              loading={loadingDeleteHotel ? loadingDeleteHotel === hotel._id : false}
              variant="contained"
              color="error"
              size="small"
              sx={{ background: '#CD1818' }}
              startIcon={<DeleteIcon />}
              onClick={onDeleteBtnClick}
            >
              {t('delete')}
            </LoadingButton>
          )}
          {isNeedButtons && (user?.role === 'admin' || user?.role === 'director') && !hotel.isPublished && (
            <LoadingButton
              disabled={loadingDeleteHotel ? loadingDeleteHotel === hotel._id : false}
              loading={loadingPublishHotel ? loadingPublishHotel === hotel._id : false}
              variant="contained"
              size="small"
              color="success"
              sx={{ background: '#0E8388' }}
              onClick={onPublishBtnClick}
            >
              {t('publish')}
            </LoadingButton>
          )}
        </Stack>
      </Box>
      <Box textAlign="center">
        {isNeedButtons && <Typography color="red">{!hotel.isPublished && 'Un publish'}</Typography>}
      </Box>
    </Card>
  );
};

export default HotelsCard;
