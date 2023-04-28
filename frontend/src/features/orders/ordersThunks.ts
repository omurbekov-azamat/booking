import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { OrderMutation, ValidationError } from '../../types';

export const sendOrder = createAsyncThunk<void, OrderMutation, { state: RootState; rejectValue: ValidationError }>(
  'orders/sendOrder',
  async (order, { getState, rejectWithValue }) => {
    const user = getState().users.user;
    try {
      if (user) {
        await axiosApi.post('/orders', order);
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);