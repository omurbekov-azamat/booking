import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApartment, ApartmentMutation, ValidationError, UpdateApartment, IRoomType, GlobalSuccess } from '../../types';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const createApartment = createAsyncThunk<
  GlobalSuccess,
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

      formData.append('hotelId', apartment.hotelId);
      formData.append('roomTypeId', apartment.roomTypeId);
      formData.append('price', JSON.stringify(apartment.price));
      formData.append('description', JSON.stringify(apartment.description));
      formData.append('AC', apartment.AC.toString());
      formData.append('balcony', apartment.balcony.toString());
      formData.append('bath', apartment.bath.toString());
      formData.append('petFriendly', apartment.petFriendly.toString());
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
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface PropsFetchApartments {
  hotelId?: string;
  userId?: string;
}

export const fetchApartments = createAsyncThunk<IApartment[], PropsFetchApartments | undefined>(
  'apartments/fetchAll',
  async (data) => {
    try {
      if (data?.hotelId) {
        const response = await axiosApi.get<IApartment[]>('/apartments?owner=' + data.hotelId);
        return response.data;
      } else if (data?.userId) {
        const response = await axiosApi.get<IApartment[]>('/apartments?getMyApartments=' + data.userId);
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
  GlobalSuccess,
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

      formData.append('hotelId', apartment.apartment.hotelId);
      formData.append('roomTypeId', apartment.apartment.roomTypeId);
      formData.append('price', JSON.stringify(apartment.apartment.price));
      formData.append('description', JSON.stringify(apartment.apartment.description));
      formData.append('AC', apartment.apartment.AC.toString());
      formData.append('balcony', apartment.apartment.balcony.toString());
      formData.append('bath', apartment.apartment.bath.toString());
      formData.append('petFriendly', apartment.apartment.petFriendly.toString());
      formData.append('food', apartment.apartment.food.toString());
      formData.append('place', apartment.apartment.place.toString());
      formData.append('tv', apartment.apartment.tv.toString());
      formData.append('towel', apartment.apartment.towel.toString());
      formData.append('wifi', apartment.apartment.wifi.toString());

      if (apartment.apartment.images) {
        for (const image of apartment.apartment.images) {
          if (image) {
            formData.append('images', image);
          }
        }
      }

      const response = await axiosApi.patch(`/apartments/${apartment.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const removeApartment = createAsyncThunk<GlobalSuccess, string>('apartments/removeOne', async (id) => {
  try {
    const response = await axiosApi.delete('/apartments/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const removeApartmentImage = createAsyncThunk<
  void,
  {
    apartmentId: string;
    imageIndex: number;
  }
>('apartments/removeImage', async ({ apartmentId, imageIndex }) => {
  try {
    await axiosApi.delete(`/apartments/${apartmentId}/images/${imageIndex}`);
  } catch {
    throw new Error();
  }
});

export const fetchRoomType = createAsyncThunk<IRoomType[]>('apartments/fetchRoomTypeAll', async () => {
  try {
    const response = await axiosApi.get<IRoomType[]>('/roomTypes');
    return response.data;
  } catch {
    throw new Error();
  }
});
