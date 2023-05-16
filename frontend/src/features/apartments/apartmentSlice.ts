import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createApartment, editApartment, fetchApartments, fetchOneApartment, removeApartment } from './apartmentThunks';
import type { GlobalSuccess, IApartment, ValidationError } from '../../types';

interface ApartmentsState {
  loadingFetchAllApartments: boolean;
  apartments: IApartment[];
  loadingFetchOneApartment: boolean;
  apartment: IApartment | null;
  loadingCreateApartment: boolean;
  loadingRemoveApartment: false | string;
  error: boolean;
  apartmentError: ValidationError | null;
  loadingApartmentEdit: boolean;
  apartmentsSuccess: GlobalSuccess | null;
}

const initialState: ApartmentsState = {
  loadingFetchAllApartments: false,
  apartments: [],
  loadingFetchOneApartment: false,
  apartment: null,
  loadingCreateApartment: false,
  loadingRemoveApartment: false,
  error: false,
  apartmentError: null,
  loadingApartmentEdit: false,
  apartmentsSuccess: null,
};

export const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    setApartmentsSuccessNull: (state) => {
      state.apartmentsSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApartments.pending, (state) => {
      state.loadingFetchAllApartments = true;
      state.error = false;
    });
    builder.addCase(fetchApartments.fulfilled, (state, action) => {
      state.loadingFetchAllApartments = false;
      state.apartments = action.payload;
      state.error = false;
    });
    builder.addCase(fetchApartments.rejected, (state) => {
      state.loadingFetchOneApartment = false;
      state.error = true;
    });
    builder.addCase(fetchOneApartment.pending, (state) => {
      state.loadingFetchOneApartment = true;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.fulfilled, (state, action) => {
      state.loadingFetchOneApartment = false;
      state.apartment = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.rejected, (state) => {
      state.loadingFetchAllApartments = false;
      state.error = true;
    });
    builder.addCase(createApartment.pending, (state) => {
      state.loadingCreateApartment = true;
      state.apartmentError = null;
    });
    builder.addCase(createApartment.fulfilled, (state, { payload: success }) => {
      state.loadingCreateApartment = false;
      state.apartmentsSuccess = success;
    });
    builder.addCase(createApartment.rejected, (state, { payload: error }) => {
      state.loadingCreateApartment = false;
      state.apartmentError = error || null;
    });
    builder.addCase(removeApartment.pending, (state, { meta }) => {
      state.loadingRemoveApartment = meta.arg;
      state.error = false;
    });
    builder.addCase(removeApartment.fulfilled, (state, { payload: success }) => {
      state.loadingRemoveApartment = false;
      state.apartmentsSuccess = success;
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
    builder.addCase(editApartment.fulfilled, (state, { payload: success }) => {
      state.loadingApartmentEdit = false;
      state.apartmentsSuccess = success;
    });
    builder.addCase(editApartment.rejected, (state, { payload: error }) => {
      state.loadingApartmentEdit = false;
      state.apartmentError = error || null;
    });
  },
});
export const apartmentsReducer = apartmentsSlice.reducer;

export const { setApartmentsSuccessNull } = apartmentsSlice.actions;

export const selectLoadingFetchAllApartments = (state: RootState) => state.apartments.loadingFetchAllApartments;
export const selectApartments = (state: RootState) => state.apartments.apartments;
export const selectLoadingFetchOneApartment = (state: RootState) => state.apartments.loadingFetchOneApartment;
export const selectOneApartment = (state: RootState) => state.apartments.apartment;
export const selectLoadingCreateApartment = (state: RootState) => state.apartments.loadingCreateApartment;
export const selectLoadingRemoveApartment = (state: RootState) => state.apartments.loadingRemoveApartment;
export const selectLoadingEditApartment = (state: RootState) => state.apartments.loadingApartmentEdit;
export const selectApartmentError = (state: RootState) => state.apartments.apartmentError;
export const selectApartmentSuccess = (state: RootState) => state.apartments.apartmentsSuccess;
