import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Hotel } from '../../types';

export const fetchHotels = createAsyncThunk<Hotel[], string | undefined>(
  'hotels/fetchAll',
  async (id: string | undefined) => {
    if (id) {
      const response = await axiosApi.get<Hotel[]>('/hotels?owner=' + id);
      return response.data;
    } else {
      const response = await axiosApi.get<Hotel[]>('/hotels');
      return response.data;
    }
  },
);
