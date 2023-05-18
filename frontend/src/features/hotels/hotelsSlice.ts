import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createHotel,
  fetchHotels,
  fetchMatches,
  fetchNewPage,
  fetchOneHotel,
  fetchSearchedHotels,
  getCabinetHotels,
  getFavoriteHotels,
  getRecommendedHotels,
  removeHotel,
  togglePublishedHotel,
  changeStatusHotels,
  fetchUnPublishedHotels,
} from './hotelsThunks';
import type { GlobalSuccess, Hotel, ValidationError } from '../../types';

interface HotelsState {
  fetchAllHotelsLoading: boolean;
  hotels: Hotel[];
  fetchOneHotelLoading: boolean;
  hotel: Hotel | null;
  unpublished: Hotel[];
  fetchUnpublishedLoading: boolean;
  fetchNewPageLoading: boolean;
  page: number;
  loadingMatchHotel: boolean;
  search: Hotel[];
  loadingCreateHotel: boolean;
  loadingRemoveHotel: false | string;
  loadingTogglePublished: false | string;
  error: boolean;
  hotelsSuccess: GlobalSuccess | null;
  createHotelError: ValidationError | null;
  fetchSearchedHotelsLoading: boolean;
  favoriteHotels: Hotel[];
  cabinetHotels: Hotel[];
  cabinetLoading: boolean;
  fetchFavoriteHotelsLoading: boolean;
  recommendedHotels: Hotel[];
  fetchRecommendedHotelsLoading: boolean;
}

const initialState: HotelsState = {
  fetchAllHotelsLoading: false,
  hotels: [],
  fetchOneHotelLoading: false,
  unpublished: [],
  fetchUnpublishedLoading: false,
  hotel: null,
  fetchNewPageLoading: false,
  page: 1,
  search: [],
  loadingMatchHotel: false,
  loadingCreateHotel: false,
  loadingRemoveHotel: false,
  loadingTogglePublished: false,
  error: false,
  hotelsSuccess: null,
  createHotelError: null,
  fetchSearchedHotelsLoading: false,
  favoriteHotels: [],
  cabinetHotels: [],
  cabinetLoading: false,
  fetchFavoriteHotelsLoading: false,
  recommendedHotels: [],
  fetchRecommendedHotelsLoading: false,
};

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    unsetCabinetHotels: (state) => {
      state.cabinetHotels = [];
    },
    setHotelsSuccessNull: (state) => {
      state.hotelsSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.pending, (state) => {
      state.hotels = [];
      state.fetchAllHotelsLoading = true;
      state.error = false;
    });
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.fetchAllHotelsLoading = false;
      state.hotels = action.payload;
      state.error = false;
    });
    builder.addCase(fetchHotels.rejected, (state) => {
      state.fetchAllHotelsLoading = false;
      state.error = true;
    });
    builder.addCase(fetchOneHotel.pending, (state) => {
      state.fetchOneHotelLoading = true;
      state.error = false;
    });
    builder.addCase(fetchOneHotel.fulfilled, (state, action) => {
      state.fetchOneHotelLoading = false;
      state.hotel = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneHotel.rejected, (state) => {
      state.fetchOneHotelLoading = false;
      state.error = true;
    });
    builder.addCase(createHotel.pending, (state) => {
      state.loadingCreateHotel = true;
      state.createHotelError = null;
    });
    builder.addCase(createHotel.fulfilled, (state, { payload: success }) => {
      state.loadingCreateHotel = false;
      state.hotelsSuccess = success;
    });
    builder.addCase(createHotel.rejected, (state, { payload: error }) => {
      state.loadingCreateHotel = false;
      state.createHotelError = error || null;
    });
    builder.addCase(removeHotel.pending, (state, { meta }) => {
      state.loadingRemoveHotel = meta.arg;
      state.error = false;
    });
    builder.addCase(removeHotel.fulfilled, (state, { payload: success }) => {
      state.loadingRemoveHotel = false;
      state.hotelsSuccess = success;
      state.error = false;
    });
    builder.addCase(removeHotel.rejected, (state) => {
      state.loadingRemoveHotel = false;
      state.error = true;
    });
    builder.addCase(togglePublishedHotel.pending, (state, { meta }) => {
      state.loadingTogglePublished = meta.arg;
      state.error = false;
    });
    builder.addCase(togglePublishedHotel.fulfilled, (state, { payload: success }) => {
      state.loadingTogglePublished = false;
      state.hotelsSuccess = success;
      state.error = false;
    });
    builder.addCase(togglePublishedHotel.rejected, (state) => {
      state.loadingTogglePublished = false;
      state.error = true;
    });
    builder.addCase(fetchNewPage.pending, (state) => {
      state.fetchNewPageLoading = true;
    });
    builder.addCase(fetchNewPage.fulfilled, (state, action) => {
      state.fetchNewPageLoading = false;
      if (action.payload.length) {
        state.hotels = state.hotels.concat(action.payload);
        state.page++;
      }
    });
    builder.addCase(fetchNewPage.rejected, (state) => {
      state.fetchNewPageLoading = false;
    });
    builder.addCase(fetchMatches.pending, (state) => {
      state.loadingMatchHotel = true;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.loadingMatchHotel = false;
      state.search = action.payload;
    });
    builder.addCase(fetchMatches.rejected, (state) => {
      state.loadingMatchHotel = false;
    });
    builder.addCase(fetchSearchedHotels.pending, (state) => {
      state.fetchSearchedHotelsLoading = true;
      state.error = false;
    });
    builder.addCase(fetchSearchedHotels.fulfilled, (state, action) => {
      state.fetchSearchedHotelsLoading = false;
      state.hotels = action.payload;
      state.error = false;
    });
    builder.addCase(fetchSearchedHotels.rejected, (state) => {
      state.fetchSearchedHotelsLoading = false;
      state.error = true;
    });
    builder.addCase(getFavoriteHotels.pending, (state) => {
      state.favoriteHotels = [];
      state.fetchFavoriteHotelsLoading = true;
    });
    builder.addCase(getFavoriteHotels.fulfilled, (state, { payload: favoriteHotels }) => {
      state.fetchFavoriteHotelsLoading = false;
      state.favoriteHotels = favoriteHotels;
    });
    builder.addCase(getFavoriteHotels.rejected, (state) => {
      state.fetchFavoriteHotelsLoading = false;
    });
    builder.addCase(getCabinetHotels.pending, (state) => {
      state.cabinetLoading = true;
    });
    builder.addCase(getCabinetHotels.fulfilled, (state, { payload: hotels }) => {
      state.cabinetLoading = false;
      state.cabinetHotels = hotels;
    });
    builder.addCase(getCabinetHotels.rejected, (state) => {
      state.cabinetLoading = false;
    });
    builder.addCase(fetchUnPublishedHotels.pending, (state) => {
      state.fetchUnpublishedLoading = true;
    });
    builder.addCase(fetchUnPublishedHotels.fulfilled, (state, { payload: hotels }) => {
      state.fetchUnpublishedLoading = false;
      state.unpublished = hotels;
    });
    builder.addCase(fetchUnPublishedHotels.rejected, (state) => {
      state.fetchUnpublishedLoading = false;
    });
    builder.addCase(getRecommendedHotels.pending, (state) => {
      state.fetchRecommendedHotelsLoading = true;
    });
    builder.addCase(getRecommendedHotels.fulfilled, (state, { payload: hotels }) => {
      state.fetchRecommendedHotelsLoading = false;
      state.recommendedHotels = hotels;
    });
    builder.addCase(getRecommendedHotels.rejected, (state) => {
      state.fetchRecommendedHotelsLoading = false;
    });
    builder.addCase(changeStatusHotels.fulfilled, (state, { payload: success }) => {
      state.hotelsSuccess = success;
    });
  },
});
export const hotelsReducer = hotelsSlice.reducer;

export const { unsetCabinetHotels, setHotelsSuccessNull } = hotelsSlice.actions;

export const selectFetchAllHotelsLoading = (state: RootState) => state.hotels.fetchAllHotelsLoading;
export const selectHotels = (state: RootState) => state.hotels.hotels;
export const selectFetchOneHotelLoading = (state: RootState) => state.hotels.fetchOneHotelLoading;
export const selectOneHotel = (state: RootState) => state.hotels.hotel;
export const selectLoadingCreateHotel = (state: RootState) => state.hotels.loadingCreateHotel;
export const selectLoadingRemoveHotel = (state: RootState) => state.hotels.loadingRemoveHotel;
export const selectLoadingTogglePublished = (state: RootState) => state.hotels.loadingTogglePublished;
export const selectLoadingFetchNewPage = (state: RootState) => state.hotels.fetchNewPageLoading;
export const selectLoadingMatch = (state: RootState) => state.hotels.loadingMatchHotel;
export const selectCreateHotelError = (state: RootState) => state.hotels.createHotelError;
export const selectPageOfHotels = (state: RootState) => state.hotels.page;
export const selectSearchHotels = (state: RootState) => state.hotels.search;
export const selectFetchSearchedHotelsLoading = (state: RootState) => state.hotels.fetchSearchedHotelsLoading;
export const selectFavoriteHotels = (state: RootState) => state.hotels.favoriteHotels;
export const selectFetchFavoriteHotelsLoading = (state: RootState) => state.hotels.fetchFavoriteHotelsLoading;
export const selectCabinetHotels = (state: RootState) => state.hotels.cabinetHotels;
export const selectCabinetLoading = (state: RootState) => state.hotels.cabinetLoading;
export const selectRecommendedHotels = (state: RootState) => state.hotels.recommendedHotels;
export const selectFetchRecommendedHotelsLoading = (state: RootState) => state.hotels.fetchRecommendedHotelsLoading;
export const selectHotelsSuccess = (state: RootState) => state.hotels.hotelsSuccess;
export const selectUnpublishedHotels = (state: RootState) => state.hotels.unpublished;
export const selectUnpublishedLoading = (state: RootState) => state.hotels.fetchUnpublishedLoading;
