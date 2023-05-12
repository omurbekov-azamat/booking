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
} from './hotelsThunks';
import type { Hotel, ValidationError } from '../../types';

interface HotelsState {
  hotels: Hotel[];
  hotel: Hotel | null;
  page: number;
  loading: boolean;
  loadingMatch: boolean;
  search: Hotel[];
  loadingCreateHotel: boolean;
  loadingRemoveHotel: false | string;
  loadingTogglePublished: false | string;
  error: boolean;
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
  hotels: [],
  hotel: null,
  page: 1,
  search: [],
  loading: false,
  loadingMatch: false,
  loadingCreateHotel: false,
  loadingRemoveHotel: false,
  loadingTogglePublished: false,
  error: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.loading = false;
      state.hotels = action.payload;
      state.error = false;
    });
    builder.addCase(fetchHotels.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneHotel.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchOneHotel.fulfilled, (state, action) => {
      state.loading = false;
      state.hotel = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneHotel.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createHotel.pending, (state) => {
      state.loadingCreateHotel = true;
      state.createHotelError = null;
    });
    builder.addCase(createHotel.fulfilled, (state) => {
      state.loadingCreateHotel = false;
    });
    builder.addCase(createHotel.rejected, (state, { payload: error }) => {
      state.loadingCreateHotel = false;
      state.createHotelError = error || null;
    });
    builder.addCase(removeHotel.pending, (state, { meta }) => {
      state.loadingRemoveHotel = meta.arg;
      state.error = false;
    });
    builder.addCase(removeHotel.fulfilled, (state) => {
      state.loadingRemoveHotel = false;
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
    builder.addCase(togglePublishedHotel.fulfilled, (state) => {
      state.loadingTogglePublished = false;
      state.error = false;
    });
    builder.addCase(togglePublishedHotel.rejected, (state) => {
      state.loadingTogglePublished = false;
      state.error = true;
    });
    builder.addCase(fetchNewPage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNewPage.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length) {
        state.hotels = state.hotels.concat(action.payload);
        state.page++;
      }
    });
    builder.addCase(fetchNewPage.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchMatches.pending, (state) => {
      state.loadingMatch = true;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.loadingMatch = true;
      state.search = action.payload;
    });
    builder.addCase(fetchMatches.rejected, (state) => {
      state.loadingMatch = true;
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
  },
});
export const hotelsReducer = hotelsSlice.reducer;

export const { unsetCabinetHotels } = hotelsSlice.actions;

export const selectHotels = (state: RootState) => state.hotels.hotels;
export const selectOneHotel = (state: RootState) => state.hotels.hotel;
export const selectLoading = (state: RootState) => state.hotels.loading;
export const selectLoadingCreateHotel = (state: RootState) => state.hotels.loadingCreateHotel;
export const selectLoadingRemoveHotel = (state: RootState) => state.hotels.loadingRemoveHotel;
export const selectLoadingTogglePublished = (state: RootState) => state.hotels.loadingTogglePublished;
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
