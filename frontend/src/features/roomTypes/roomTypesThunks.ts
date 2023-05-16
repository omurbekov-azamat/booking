import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { IRoomType, RoomTypesMutation, ValidationError } from '../../types';

export const createNewRoomType = createAsyncThunk<void, RoomTypesMutation, { rejectValue: ValidationError }>(
  'roomTypes/createNewRoomType',
  async (data, { rejectWithValue }) => {
    try {
      await axiosApi.post('/roomTypes', data);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  },
);

export const fetchRoomTypes = createAsyncThunk<IRoomType[]>('roomTypes/fetchRoomTypeAll', async () => {
  try {
    const response = await axiosApi.get<IRoomType[]>('/roomTypes');
    return response.data;
  } catch {
    throw new Error();
  }
});
