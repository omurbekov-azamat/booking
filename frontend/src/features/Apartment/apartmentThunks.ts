import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApartment, ApartmentMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const createApartment = createAsyncThunk<
  void,
  ApartmentMutation,
  {
    state: RootState;
    rejectValue: ValidationError;
  }
>('apartments/createApartment', async (apartment, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      const formData = new FormData();
      const keys = Object.keys(apartment) as (keyof ApartmentMutation)[];

      keys.forEach((key) => {
        const value = apartment[key];
        if (value !== null) {
          if ((key as string) === 'location') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });
      await axiosApi.post('/apartments', formData);
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const fetchApartments = createAsyncThunk<IApartment[], string | undefined>(
  'apartments/fetchAll',
  async (hotelId: string | undefined) => {
    try {
      if (hotelId) {
        const response = await axiosApi.get<IApartment[]>('/apartments?owner=' + hotelId);
        return response.data;
      } else {
        const response = await axiosApi.get<IApartment[]>('/apartments');
        return response.data;
      }
    } catch {
      throw new Error();
    }
  },
);

export const fetchOneApartment = createAsyncThunk<IApartment, string>('apartments/fetchOne', async (id: string) => {
  try {
    const response = await axiosApi.get<IApartment>('/apartments/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const editApartment = createAsyncThunk<
  void,
  ApartmentMutation,
  {
    state: RootState;
    rejectValue: ValidationError;
  }
>('apartments/editApartment', async (apartment, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      const formData = new FormData();
      const keys = Object.keys(apartment) as (keyof ApartmentMutation)[];

      keys.forEach((key) => {
        const value = apartment[key];
        if (value !== null) {
          if ((key as string) === 'location') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });
      await axiosApi.patch('/apartments', formData);
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const removeApartment = createAsyncThunk<void, string>('apartments/removeOne', async (id) => {
  try {
    await axiosApi.delete('/apartments/' + id);
  } catch {
    throw new Error();
  }
});