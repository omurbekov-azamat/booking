import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createNewRoomType, fetchRoomTypes } from './roomTypesThunks';
import { IRoomType, ValidationError } from '../../types';

interface RoomTypesState {
  loadingCreateRoomType: boolean;
  errorCreateRoomType: ValidationError | null;
  loadingFetchAllRoomTypes: boolean;
  roomTypes: IRoomType[];
}

const initialState: RoomTypesState = {
  loadingCreateRoomType: false,
  errorCreateRoomType: null,
  loadingFetchAllRoomTypes: false,
  roomTypes: [],
};

export const roomTypesSlice = createSlice({
  name: 'roomTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewRoomType.pending, (state) => {
      state.loadingCreateRoomType = true;
      state.errorCreateRoomType = null;
    });
    builder.addCase(createNewRoomType.fulfilled, (state) => {
      state.loadingCreateRoomType = false;
    });
    builder.addCase(createNewRoomType.rejected, (state, { payload: error }) => {
      state.loadingCreateRoomType = false;
      state.errorCreateRoomType = error || null;
    });
    builder.addCase(fetchRoomTypes.pending, (state) => {
      state.loadingFetchAllRoomTypes = true;
    });
    builder.addCase(fetchRoomTypes.fulfilled, (state, action) => {
      state.loadingFetchAllRoomTypes = false;
      state.roomTypes = action.payload;
    });
    builder.addCase(fetchRoomTypes.rejected, (state) => {
      state.loadingFetchAllRoomTypes = false;
    });
  },
});

export const roomTypesReducer = roomTypesSlice.reducer;

export const selectLoadingCreateRoomType = (state: RootState) => state.roomTypes.loadingCreateRoomType;
export const selectErrorCreateRoomType = (state: RootState) => state.roomTypes.errorCreateRoomType;
export const selectLoadingFetchAllRoomTypes = (state: RootState) => state.roomTypes.loadingFetchAllRoomTypes;
export const selectRoomTypes = (state: RootState) => state.roomTypes.roomTypes;
