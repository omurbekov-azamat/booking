import React, { MouseEventHandler } from 'react';
import { Box, Checkbox, Grid, Link, Rating, Stack, Typography } from '@mui/material';
import { Hotel } from '../../../types';
import { apiURL } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCurrency } from '../../currency/currencySlice';
import premium from '../../../assets/images/premium.png';
import business from '../../../assets/images/business.png';
import standard from '../../../assets/images/standard.png';
import { changeFavorites, reAuthorization } from '../../users/usersThunks';
import { getFavoriteHotels } from '../hotelsThunks';
import { selectUser } from '../../users/usersSlice';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectLoadingRemoveHotel, selectLoadingTogglePublished } from '../hotelsSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
  hotel: Hotel;
  commentAmount?: number;
  onDeleteBtnClick?: MouseEventHandler;
  onPublishBtnClick?: MouseEventHandler;
  isNeedButtons?: true;
}

const HotelCardLarge: React.FC<Props> = ({
  hotel,
  commentAmount,
  onDeleteBtnClick,
  onPublishBtnClick,
  isNeedButtons,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useAppSelector(selectCurrency);
  const user = useAppSelector(selectUser);
  const loadingDeleteHotel = useAppSelector(selectLoadingRemoveHotel);
  const loadingPublishHotel = useAppSelector(selectLoadingTogglePublished);
  const cardImage = apiURL + '/' + hotel.image;
  const favorite = user?.role === 'user' && user.favorites.includes(hotel._id);
  let status;
  let statusIcon;
  let city;

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

  switch (hotel.status) {
    case 'premium':
      status = t('premium');
      statusIcon = premium;
      break;
    case 'business':
      status = t('business');
      statusIcon = business;
      break;
    case 'standard':
      status = t('standard');
      statusIcon = standard;
      break;
    default:
      break;
  }

  switch (hotel.city) {
    case 'bishkek':
      city = t('bishkek');
      break;
    case 'issykKul':
      city = t('issykKul');
      break;
    case 'osh':
      city = t('osh');
      break;
    case 'kara-balta':
      city = t('kara-balta');
      break;
    case 'tokmok':
      city = t('tokmok');
      break;
    case 'kant':
      city = t('kant');
      break;
    case 'talas':
      city = t('talas');
      break;
    case 'kara-suu':
      city = t('kara-suu');
      break;
    case 'nookat':
      city = t('nookat');
      break;
    case 'uzgen':
      city = t('uzgen');
      break;
    case 'suzak':
      city = t('suzak');
      break;
    case 'kara-kulja':
      city = t('kara-kulja');
      break;
    case 'naryn':
      city = t('naryn');
      break;
    case 'atbashi':
      city = t('atbashi');
      break;
    case 'kochkor':
      city = t('kochkor');
      break;
    case 'isfana':
      city = t('isfana');
      break;
    case 'kyzyl-kiya':
      city = t('kyzyl-kiya');
      break;
    case 'leylek':
      city = t('leylek');
      break;
  }

  return (
    <>
      <Box sx={{ border: 2, borderRadius: 5, borderColor: 'rgba(3, 201, 136, 0.7)', p: 1, overflow: 'hidden' }}>
        <Grid container gap={2}>
          <Grid item style={{ maxWidth: '200px', maxHeight: '200px' }}>
            <LazyLoadImage
              alt={hotel.name}
              width="100%"
              height="auto"
              effect="blur"
              src={cardImage}
              placeholderSrc="https://unsplash.it/200/100?image=44"
            ></LazyLoadImage>
            {/*<CardMedia component="img" width="100%" height="auto" image={cardImage} alt={hotel.name} />*/}
          </Grid>

          <Grid item flex={1} onClick={() => onClickCard(hotel._id)}>
            <Grid container flexDirection="row" justifyContent="space-between">
              <Grid container gap={1} alignItems="center">
                <Grid item>
                  <Typography variant="h5" fontWeight="bolder">
                    {hotel.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating name="read-only" value={hotel.star} precision={0.5} readOnly size="small" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item>
                <Typography variant="h6">{city}</Typography>
              </Grid>
              <Grid item>
                <Typography color={'grey'} fontSize={18}>
                  {t('founding') + ' ' + hotel.founding}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color={'grey'} fontSize={18}>
                  {t('lowestPrice') +
                    ' ' +
                    (currency === 'kgs' ? hotel.lowestPrice.som + ' KGS' : hotel.lowestPrice.dollar + ' USD')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container flexDirection="column" alignItems="center">
              <Grid item style={{ width: 35, height: 35, padding: 0 }}>
                <img src={statusIcon} alt={status} style={{ width: '100%', height: 'auto' }} />
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 16 }}>{status}</Typography>
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: 'none', color: '#6b6b6b' }}
                  component={RouterLink}
                  to={'/hotel/' + hotel._id + '/comments'}
                  variant="body2"
                >
                  {t('comments') + ': ' + commentAmount}
                </Link>
              </Grid>
              {user && user.role === 'user' && (
                <Grid item>
                  <Checkbox
                    onClick={() => onClickFavorite(hotel._id)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    color="error"
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="space-around" m={1}>
            {isNeedButtons && (user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
              <LoadingButton
                disabled={loadingDeleteHotel ? loadingDeleteHotel === hotel._id : false}
                variant="contained"
                size="medium"
                onClick={() => navigate('/my-cabinet/edit-hotel/' + hotel._id)}
              >
                {t('edit')}
              </LoadingButton>
            )}
            {isNeedButtons && (user?.role === 'admin' || user?.role === 'director' || user?._id === hotel.userId) && (
              <LoadingButton
                disabled={loadingPublishHotel ? loadingPublishHotel === hotel._id : false}
                loading={loadingDeleteHotel ? loadingDeleteHotel === hotel._id : false}
                variant="outlined"
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
                variant="outlined"
                color="error"
                sx={{ fontSize: 11 }}
                onClick={onPublishBtnClick}
              >
                {t('publish')}
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default HotelCardLarge;
