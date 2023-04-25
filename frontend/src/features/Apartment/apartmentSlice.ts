import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { IApartment, ValidationError } from '../../types';
import { createApartment, fetchApartments, fetchOneApartment, removeApartment } from './apartmentThunks';

interface ApartmentsState {
  apartments: IApartment[];
  apartment: IApartment | null;
  loading: boolean;
  loadingCreateApartment: boolean;
  loadingRemoveApartment: false | string;
  error: boolean;
  loadingApartmentError: ValidationError | null;
}

const initialState: ApartmentsState = {
  apartments: [],
  apartment: null,
  loading: false,
  loadingCreateApartment: false,
  loadingRemoveApartment: false,
  error: false,
  loadingApartmentError: null,
};

export const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApartments.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchApartments.fulfilled, (state, action) => {
      state.loading = false;
      state.apartments = action.payload;
      state.error = false;
    });
    builder.addCase(fetchApartments.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneApartment.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.fulfilled, (state, action) => {
      state.loading = false;
      state.apartment = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createApartment.pending, (state) => {
      state.loadingCreateApartment = true;
      state.loadingApartmentError = null;
    });
    builder.addCase(createApartment.fulfilled, (state) => {
      state.loadingCreateApartment = false;
    });
    builder.addCase(createApartment.rejected, (state, { payload: error }) => {
      state.loadingCreateApartment = false;
      state.loadingApartmentError = error || null;
    });
    builder.addCase(removeApartment.pending, (state, { meta }) => {
      state.loadingRemoveApartment = meta.arg;
      state.error = false;
    });
    builder.addCase(removeApartment.fulfilled, (state) => {
      state.loadingRemoveApartment = false;
      state.error = false;
    });
    builder.addCase(removeApartment.rejected, (state) => {
      state.loadingRemoveApartment = false;
      state.error = true;
    });
  },
});
export const apartmentsReducer = apartmentsSlice.reducer;

export const selectApartments = (state: RootState) => state.apartments.apartments;
export const selectOneApartment = (state: RootState) => state.apartments.apartment;
export const selectLoading = (state: RootState) => state.apartments.loading;
export const selectLoadingCreateApartment = (state: RootState) => state.apartments.loadingCreateApartment;
export const selectLoadingRemoveApartment = (state: RootState) => state.apartments.loadingRemoveApartment;
export const selectApartmentError = (state: RootState) => state.apartments.loadingApartmentError;
