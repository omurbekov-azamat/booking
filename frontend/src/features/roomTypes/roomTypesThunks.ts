import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { RoomTypesMutation, ValidationError } from '../../types';

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
