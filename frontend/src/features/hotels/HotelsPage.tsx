import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels, fetchNewPage, removeHotel, togglePublishedHotel } from './hotelsThunks';
import {
  selectFetchAllHotelsLoading,
  selectHotels,
  selectLoadingFetchNewPage,
  selectPageOfHotels,
} from './hotelsSlice';
import { Grid } from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner';
import HotelsCard from './components/HotelsCard';
import SearchHotelForm from './components/SearchHotelForm';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import SearchField from './components/SearchField/SearchField';
import HotelCardLarge from './components/HotelCardLarge';

const HotelsPage = () => {
  const dispatch = useAppDispatch();
  const fetchAllHotelsLoading = useAppSelector(selectFetchAllHotelsLoading);
  const fetchNewPageLoading = useAppSelector(selectLoadingFetchNewPage);
  const hotels = useAppSelector(selectHotels);
  const page = useAppSelector(selectPageOfHotels);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const addMore = (pageNum: number) => {
    dispatch(fetchNewPage(pageNum));
  };

  const unPublishButton = async (id: string) => {
    await dispatch(togglePublishedHotel(id));
    await dispatch(fetchHotels());
  };

  const deleteButton = async (id: string) => {
    await dispatch(removeHotel(id));
    await dispatch(fetchHotels());
  };

  return (
    <>
      <SearchField />
      <SearchHotelForm />
      {fetchAllHotelsLoading && <Spinner />}
      {fetchNewPageLoading && <Spinner />}
      {hotels &&
        hotels.map((el) => (
          <Grid item xs={12} sm={6} lg={4} key={el._id} alignItems="stretch">
            <HotelCardLarge hotel={el} />
          </Grid>
        ))}
      <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
        {hotels &&
          hotels.map((el) => (
            <Grid item xs={12} sm={6} lg={4} key={el._id} alignItems="stretch">
              <HotelsCard
                hotel={el}
                onDeleteBtnClick={() => deleteButton(el._id)}
                onPublishBtnClick={() => unPublishButton(el._id)}
              />
            </Grid>
          ))}
        <Grid item container xs={12}>
          <LoadingButton
            loading={fetchNewPageLoading}
            style={{ margin: 'auto' }}
            variant="outlined"
            onClick={() => addMore(page)}
          >
            {t('more')}
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelsPage;
