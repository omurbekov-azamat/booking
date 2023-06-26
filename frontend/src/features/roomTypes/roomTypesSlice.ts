import { createNewRoomType, deleteRoomType, fetchOneRoomType, fetchRoomTypes } from './roomTypesThunks';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GlobalSuccess, IRoomType, ValidationError } from '../../types';

interface RoomTypesState {
  loadingCreateRoomType: boolean;
  errorCreateRoomType: ValidationError | null;
  loadingFetchAllRoomTypes: boolean;
  roomTypes: IRoomType[];
  deleteRoomTypeLoading: string | false;
  roomTypeSuccess: GlobalSuccess | null;
  fetchOneRoomTypeLoading: boolean;
  oneRoomType: IRoomType | null;
}

const initialState: RoomTypesState = {
  loadingCreateRoomType: false,
  errorCreateRoomType: null,
  loadingFetchAllRoomTypes: false,
  roomTypes: [],
  deleteRoomTypeLoading: false,
  roomTypeSuccess: null,
  fetchOneRoomTypeLoading: false,
  oneRoomType: null,
};

export const roomTypesSlice = createSlice({
  name: 'roomTypes',
  initialState,
  reducers: {
    setRoomTypeSuccessNull: (state) => {
      state.roomTypeSuccess = null;
    },
  },
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
      state.roomTypes = [];
      state.loadingFetchAllRoomTypes = true;
    });
    builder.addCase(fetchRoomTypes.fulfilled, (state, action) => {
      state.loadingFetchAllRoomTypes = false;
      state.roomTypes = action.payload;
    });
    builder.addCase(fetchRoomTypes.rejected, (state) => {
      state.loadingFetchAllRoomTypes = false;
    });
    builder.addCase(deleteRoomType.pending, (state, { meta }) => {
      state.deleteRoomTypeLoading = meta.arg;
    });
    builder.addCase(deleteRoomType.fulfilled, (state, { payload: success }) => {
      state.deleteRoomTypeLoading = false;
      state.roomTypeSuccess = success;
    });
    builder.addCase(deleteRoomType.rejected, (state) => {
      state.deleteRoomTypeLoading = false;
    });
    builder.addCase(fetchOneRoomType.pending, (state) => {
      state.fetchOneRoomTypeLoading = true;
    });
    builder.addCase(fetchOneRoomType.fulfilled, (state, { payload: room }) => {
      state.fetchOneRoomTypeLoading = false;
      state.oneRoomType = room;
    });
    builder.addCase(fetchOneRoomType.rejected, (state) => {
      state.fetchOneRoomTypeLoading = false;
    });
  },
});

export const roomTypesReducer = roomTypesSlice.reducer;

export const { setRoomTypeSuccessNull } = roomTypesSlice.actions;
export const selectLoadingCreateRoomType = (state: RootState) => state.roomTypes.loadingCreateRoomType;
export const selectErrorCreateRoomType = (state: RootState) => state.roomTypes.errorCreateRoomType;
export const selectLoadingFetchAllRoomTypes = (state: RootState) => state.roomTypes.loadingFetchAllRoomTypes;
export const selectRoomTypes = (state: RootState) => state.roomTypes.roomTypes;
export const selectDeleteRoomTypeLoading = (state: RootState) => state.roomTypes.deleteRoomTypeLoading;
export const selectRoomTypeSuccess = (state: RootState) => state.roomTypes.roomTypeSuccess;
export const selectFetchOneRoomTypeLoading = (state: RootState) => state.roomTypes.fetchOneRoomTypeLoading;
export const selectOneRoomType = (state: RootState) => state.roomTypes.oneRoomType;
