import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { GlobalSuccess, IRoomType, RoomTypesMutation, UpdateRoomType, ValidationError } from '../../types';

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

export const deleteRoomType = createAsyncThunk<GlobalSuccess, string>(
  'roomTypes/deleteRoomType',
  async (id, { dispatch }) => {
    try {
      try {
        const response = await axiosApi.delete<GlobalSuccess>('roomTypes/' + id);
        return response.data;
      } finally {
        dispatch(fetchRoomTypes());
      }
    } catch {
      throw new Error();
    }
  },
);

export const fetchOneRoomType = createAsyncThunk<IRoomType, string>(
  'roomTypes/fetchOneRoomType',
  async (id: string) => {
    try {
      const response = await axiosApi.get<IRoomType>('/roomTypes/' + id);
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const editRoomType = createAsyncThunk<GlobalSuccess, UpdateRoomType>('roomTypes/editRoomType', async (data) => {
  try {
    const response = await axiosApi.patch(`/roomTypes/${data.id}`, data.roomType);
    return response.data;
  } catch {
    throw new Error();
  }
});
