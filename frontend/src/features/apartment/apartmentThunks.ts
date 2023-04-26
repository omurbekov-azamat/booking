import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApartment, ApartmentMutation, ValidationError, UpdateApartment } from '../../types';
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
    // console.log('thunk is here', apartment);
    if (user) {
      const formData = new FormData();

      formData.append('hotelId', apartment.hotelId);
      formData.append('roomTypeId', apartment.roomTypeId);
      formData.append('price', JSON.stringify(apartment.price));
      formData.append('description', apartment.description || '');
      formData.append('aircon', apartment.aircon.toString());
      formData.append('balcony', apartment.balcony.toString());
      formData.append('bath', apartment.bath.toString());
      formData.append('family', apartment.family.toString());
      formData.append('food', apartment.food.toString());
      formData.append('place', apartment.place.toString());
      formData.append('tv', apartment.tv.toString());
      formData.append('towel', apartment.towel.toString());
      formData.append('wifi', apartment.wifi.toString());

      if (apartment.images) {
        for (const image of apartment.images) {
          if (image) {
            formData.append('images', image);
          }
        }
      }

      const response = await axiosApi.post('/apartments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    }
    //   const formData = new FormData();
    //   const keys = Object.keys(apartment) as (keyof ApartmentMutation)[];
    //
    //   keys.forEach((key) => {
    //     const value = apartment[key];
    //     if (value !== null) {
    //       if ((key as string) === 'location') {
    //         formData.append(key, JSON.stringify(value));
    //       } else {
    //         formData.append(key, value as string | Blob);
    //       }
    //     }
    //   });
    //   console.log('form data is here', formData);
    //   await axiosApi.post('/apartments', formData);
    // }
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
  UpdateApartment,
  {
    state: RootState;
    rejectValue: ValidationError;
  }
>('apartments/editApartment', async (apartment, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      const formData = new FormData();
      const keys = Object.keys(apartment.apartment) as (keyof ApartmentMutation)[];

      keys.forEach((key) => {
        const value = apartment.apartment[key];
        if (value !== null) {
          if ((key as string) === 'location') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });
      await axiosApi.patch('/apartments/' + apartment.id, formData);
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
