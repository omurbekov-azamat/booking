import { createAsyncThunk } from '@reduxjs/toolkit';
import { HotelMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios/index';

export const createApartment = createAsyncThunk<void, HotelMutation, { state: RootState; rejectValue: ValidationError }>(
  'apartment/createApartment',
  async (hotel, { getState, rejectWithValue }) => {
    try {
      const user = getState().users.user;

      if (user) {
        const formData = new FormData();
        const keys = Object.keys(hotel) as (keyof HotelMutation)[];

        keys.forEach((key) => {
          const value = hotel[key];
          if (value !== null) {
            if (key === 'location') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value as string | Blob);
            }
          }
        });
        await axiosApi.post('/hotels', formData);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
