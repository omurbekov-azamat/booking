import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createNewRoomType } from './roomTypesThunks';
import { ValidationError } from '../../types';

interface RoomTypesState {
  loadingCreateRoomType: boolean;
  errorCreateRoomType: ValidationError | null;
}

const initialState: RoomTypesState = {
  loadingCreateRoomType: false,
  errorCreateRoomType: null,
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
  },
});

export const roomTypesReducer = roomTypesSlice.reducer;

export const selectLoadingCreateRoomType = (state: RootState) => state.roomTypes.loadingCreateRoomType;
export const selectErrorCreateRoomType = (state: RootState) => state.roomTypes.errorCreateRoomType;
