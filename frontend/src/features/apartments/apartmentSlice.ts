import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { IApartment, ValidationError } from '../../types';
import { createApartment, editApartment, fetchApartments, fetchOneApartment, removeApartment } from './apartmentThunks';

interface ApartmentsState {
  apartments: IApartment[];
  apartment: IApartment | null;
  loadingApartment: boolean;
  loadingCreateApartment: boolean;
  loadingRemoveApartment: false | string;
  error: boolean;
  apartmentError: ValidationError | null;
  loadingApartmentEdit: boolean;
}

const initialState: ApartmentsState = {
  apartments: [],
  apartment: null,
  loadingApartment: false,
  loadingCreateApartment: false,
  loadingRemoveApartment: false,
  error: false,
  apartmentError: null,
  loadingApartmentEdit: false,
};

export const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApartments.pending, (state) => {
      state.loadingApartment = true;
      state.error = false;
    });
    builder.addCase(fetchApartments.fulfilled, (state, action) => {
      state.loadingApartment = false;
      state.apartments = action.payload;
      state.error = false;
    });
    builder.addCase(fetchApartments.rejected, (state) => {
      state.loadingApartment = false;
      state.error = true;
    });
    builder.addCase(fetchOneApartment.pending, (state) => {
      state.loadingApartment = true;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.fulfilled, (state, action) => {
      state.loadingApartment = false;
      state.apartment = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.rejected, (state) => {
      state.loadingApartment = false;
      state.error = true;
    });
    builder.addCase(createApartment.pending, (state) => {
      state.loadingCreateApartment = true;
      state.apartmentError = null;
    });
    builder.addCase(createApartment.fulfilled, (state) => {
      state.loadingCreateApartment = false;
    });
    builder.addCase(createApartment.rejected, (state, { payload: error }) => {
      state.loadingCreateApartment = false;
      state.apartmentError = error || null;
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
    builder.addCase(editApartment.pending, (state) => {
      state.loadingApartmentEdit = true;
      state.apartmentError = null;
    });
    builder.addCase(editApartment.fulfilled, (state) => {
      state.loadingApartmentEdit = false;
    });
    builder.addCase(editApartment.rejected, (state, { payload: error }) => {
      state.loadingApartmentEdit = false;
      state.apartmentError = error || null;
    });
  },
});
export const apartmentsReducer = apartmentsSlice.reducer;

export const selectApartments = (state: RootState) => state.apartments.apartments;
export const selectOneApartment = (state: RootState) => state.apartments.apartment;
export const selectLoadingApartment = (state: RootState) => state.apartments.loadingApartment;
export const selectLoadingCreateApartment = (state: RootState) => state.apartments.loadingCreateApartment;
export const selectLoadingRemoveApartment = (state: RootState) => state.apartments.loadingRemoveApartment;
export const selectApartmentError = (state: RootState) => state.apartments.apartmentError;
export const selectLoadingEdit = (state: RootState) => state.apartments.loadingApartmentEdit;
