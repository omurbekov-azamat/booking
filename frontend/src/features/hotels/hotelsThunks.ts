import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Hotel, HotelMutation, SearchData, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

export const fetchHotels = createAsyncThunk<Hotel[], string | undefined>(
  'hotels/fetchAll',
  async (id: string | undefined) => {
    try {
      if (id) {
        const response = await axiosApi.get<Hotel[]>('/hotels?owner=' + id);
        return response.data;
      } else {
        const response = await axiosApi.get<Hotel[]>('/hotels');
        return response.data;
      }
    } catch {
      throw new Error();
    }
  },
);

export const fetchSearchedHotels = createAsyncThunk<Hotel[], SearchData>('hotels/searched', async (data) => {
  try {
    const response = await axiosApi.get<Hotel[]>(
      '/hotels?nonSmoking=' +
        data.smoking +
        '&swimmingPool=' +
        data.pool +
        '&city=' +
        data.city +
        '&parking=' +
        data.parking +
        '&petFriendly=' +
        data.petFriendly,
    );
    return response.data;
  } catch {
    throw new Error();
  }
});

export const fetchNewPage = createAsyncThunk<Hotel[], number>('hotels/nextPage', async (page) => {
  try {
    const response = await axiosApi.get<Hotel[]>('hotels?page=' + page);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const fetchMatches = createAsyncThunk<Hotel[], string>('hotels/matches', async (match) => {
  try {
    const response = await axiosApi.get<Hotel[]>('hotels?match=' + match);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const fetchOneHotel = createAsyncThunk<Hotel, string>('hotels/fetchOne', async (id: string) => {
  try {
    const response = await axiosApi.get<Hotel>('/hotels/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const createHotel = createAsyncThunk<void, HotelMutation, { state: RootState; rejectValue: ValidationError }>(
  'hotels/createHotel',
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

export const removeHotel = createAsyncThunk<void, string>('hotels/removeOne', async (id) => {
  try {
    await axiosApi.delete('/hotels/' + id);
  } catch {
    throw new Error();
  }
});

export const togglePublishedHotel = createAsyncThunk<void, string>('hotels/togglePublished', async (id) => {
  try {
    await axiosApi.patch('/hotels/' + id + '/togglePublished');
  } catch {
    throw new Error();
  }
});
