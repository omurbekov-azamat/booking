import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { GlobalSuccess, Hotel, HotelMutation, SearchData, ValidationError } from '../../types';
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

export const fetchUnPublishedHotels = createAsyncThunk<Hotel[]>('hotels/unPublished', async () => {
  try {
    const response = await axiosApi.get<Hotel[]>('hotels/get/unPublished');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const fetchSearchedHotels = createAsyncThunk<Hotel[], SearchData>('hotels/searched', async (data) => {
  try {
    const response = await axiosApi.get<Hotel[]>(
      '/hotels?nonSmoking=' +
        data.nonSmokingRooms +
        '&swimmingPool=' +
        data.swimmingPool +
        '&city=' +
        data.city +
        '&parking=' +
        data.parking +
        '&star=' +
        data.star +
        '&petFriendly=' +
        data.petFriendly +
        '&type=' +
        data.propertyType,
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

export const getCabinetHotels = createAsyncThunk<Hotel[], string>('hotels/getCabinetHotels', async (match) => {
  try {
    const responseUsers = await axiosApi.get<Hotel[]>('/hotels/getMatchedHotels?' + match);
    return responseUsers.data;
  } catch {
    throw new Error();
  }
});

interface statusProps {
  id: string;
  status: string;
}

export const changeStatusHotels = createAsyncThunk<GlobalSuccess, statusProps>(
  'users/changeStatus',
  async ({ status, id }) => {
    try {
      const response = await axiosApi.patch<GlobalSuccess>('/hotels/status/' + id, { status });
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const createHotel = createAsyncThunk<
  GlobalSuccess,
  HotelMutation,
  { state: RootState; rejectValue: ValidationError }
>('hotels/createHotel', async (hotel, { getState, rejectWithValue }) => {
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
          } else if (key === 'lowestPrice') {
            formData.append(key, JSON.stringify(value));
          } else if (key === 'description') {
            formData.append(key, JSON.stringify(value));
          } else if (key === 'address') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });
      const response = await axiosApi.post('/hotels', formData);
      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface updatedData {
  hotel: HotelMutation;
  id: string;
}

export const editHotel = createAsyncThunk<
  GlobalSuccess,
  updatedData,
  {
    state: RootState;
    rejectValue: ValidationError;
  }
>('hotels/editHotel', async (updatedData, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      const formData = new FormData();
      const keys = Object.keys(updatedData.hotel) as (keyof HotelMutation)[];
      keys.forEach((key) => {
        const value = updatedData.hotel[key];
        if (value !== null) {
          if (key === 'lowestPrice') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as string | Blob);
          }
        }
      });

      const response = await axiosApi.patch('/hotels/' + updatedData.id, formData);

      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const removeHotel = createAsyncThunk<GlobalSuccess, string>('hotels/removeOne', async (id) => {
  try {
    const response = await axiosApi.delete<GlobalSuccess>('/hotels/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const togglePublishedHotel = createAsyncThunk<GlobalSuccess, string>('hotels/togglePublished', async (id) => {
  try {
    const response = await axiosApi.patch('/hotels/' + id + '/togglePublished');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const getFavoriteHotels = createAsyncThunk<Hotel[]>('hotels/getFavoriteHotels', async () => {
  try {
    const responseFavoriteHotels = await axiosApi.get<Hotel[]>('/hotels/get/favorites');
    return responseFavoriteHotels.data;
  } catch {
    throw new Error();
  }
});

export const getRecommendedHotels = createAsyncThunk<Hotel[]>('hotels/getRecommendedHotels', async () => {
  try {
    const responseRecommendedHotels = await axiosApi.get<Hotel[]>('/hotels/random/recommended');
    return responseRecommendedHotels.data;
  } catch {
    throw new Error();
  }
});
