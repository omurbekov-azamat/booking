import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createHotel,
  fetchHotels,
  fetchNewPage,
  fetchOneHotel,
  removeHotel,
  togglePublishedHotel,
} from './hotelsThunks';
import type { Hotel, ValidationError } from '../../types';

interface ArtistsState {
  hotels: Hotel[];
  hotel: Hotel | null;
  page: number;
  loading: boolean;
  loadingCreateHotel: boolean;
  loadingRemoveHotel: false | string;
  loadingTogglePublished: false | string;
  error: boolean;
  createHotelError: ValidationError | null;
}

const initialState: ArtistsState = {
  hotels: [],
  hotel: null,
  page: 1,
  loading: false,
  loadingCreateHotel: false,
  loadingRemoveHotel: false,
  loadingTogglePublished: false,
  error: false,
  createHotelError: null,
};

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {},
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
  },
});
export const hotelsReducer = hotelsSlice.reducer;

export const selectHotels = (state: RootState) => state.hotels.hotels;
export const selectOneHotel = (state: RootState) => state.hotels.hotel;
export const selectLoading = (state: RootState) => state.hotels.loading;
export const selectLoadingCreateHotel = (state: RootState) => state.hotels.loadingCreateHotel;
export const selectLoadingRemoveHotel = (state: RootState) => state.hotels.loadingRemoveHotel;
export const selectLoadingTogglePublished = (state: RootState) => state.hotels.loadingTogglePublished;
export const selectCreateHotelError = (state: RootState) => state.hotels.createHotelError;
export const selectPageOfHotels = (state: RootState) => state.hotels.page;
