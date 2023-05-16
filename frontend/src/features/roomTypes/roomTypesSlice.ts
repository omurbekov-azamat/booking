import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface RoomTypesState {
  loadingCreateRoomType: boolean;
}

const initialState: RoomTypesState = {
  loadingCreateRoomType: false,
};

export const roomTypesSlice = createSlice({
  name: 'roomTypes',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const roomTypesReducer = roomTypesSlice.reducer;

export const selectLoadingCreateRoomType = (state: RootState) => state.roomTypes.loadingCreateRoomType;
