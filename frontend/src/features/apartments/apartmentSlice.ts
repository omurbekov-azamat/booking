import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { GlobalSuccess, IApartment, IRoomType, ValidationError } from '../../types';
import {
  createApartment,
  editApartment,
  fetchApartments,
  fetchOneApartment,
  fetchRoomType,
  removeApartment,
} from './apartmentThunks';

interface ApartmentsState {
  loadingFetchAllApartments: boolean;
  apartments: IApartment[];
  apartment: IApartment | null;
  loadingCreateApartment: boolean;
  loadingRemoveApartment: false | string;
  error: boolean;
  apartmentError: ValidationError | null;
  loadingApartmentEdit: boolean;
  roomType: IRoomType[];
  roomTypeLoading: boolean;
  apartmentsSuccess: GlobalSuccess | null;
}

const initialState: ApartmentsState = {
  apartments: [],
  apartment: null,
  loadingFetchAllApartments: false,
  loadingCreateApartment: false,
  loadingRemoveApartment: false,
  error: false,
  apartmentError: null,
  loadingApartmentEdit: false,
  roomType: [],
  roomTypeLoading: false,
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
      state.loadingFetchAllApartments = false;
      state.error = true;
    });
    builder.addCase(fetchOneApartment.pending, (state) => {
      state.loadingFetchAllApartments = true;
      state.error = false;
    });
    builder.addCase(fetchOneApartment.fulfilled, (state, action) => {
      state.loadingFetchAllApartments = false;
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
    builder.addCase(fetchRoomType.pending, (state) => {
      state.roomTypeLoading = true;
      state.error = false;
    });
    builder.addCase(fetchRoomType.fulfilled, (state, action) => {
      state.roomTypeLoading = false;
      state.roomType = action.payload;
      state.error = false;
    });
    builder.addCase(fetchRoomType.rejected, (state) => {
      state.roomTypeLoading = false;
      state.error = true;
    });
  },
});
export const apartmentsReducer = apartmentsSlice.reducer;

export const selectApartments = (state: RootState) => state.apartments.apartments;
export const selectOneApartment = (state: RootState) => state.apartments.apartment;
export const selectLoadingFetchAllApartments = (state: RootState) => state.apartments.loadingFetchAllApartments;
export const selectLoadingCreateApartment = (state: RootState) => state.apartments.loadingCreateApartment;
export const selectLoadingRemoveApartment = (state: RootState) => state.apartments.loadingRemoveApartment;
export const selectApartmentError = (state: RootState) => state.apartments.apartmentError;
export const selectLoadingEdit = (state: RootState) => state.apartments.loadingApartmentEdit;
export const selectRoomType = (state: RootState) => state.apartments.roomType;
export const selectLoadingRoomType = (state: RootState) => state.apartments.roomTypeLoading;
export const selectApartmentSuccess = (state: RootState) => state.apartments.apartmentsSuccess;
export const { setApartmentsSuccessNull } = apartmentsSlice.actions;
