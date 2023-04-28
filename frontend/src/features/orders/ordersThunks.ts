import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { Order, OrderMutation, ValidationError } from '../../types';

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

export const getOrders = createAsyncThunk<Order[]>('orders/getOrders', async () => {
  try {
    const responseOrders = await axiosApi.get<Order[]>('/orders');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const getForAdminHisOrders = createAsyncThunk<Order[], string>('orders/getOrdersForAdmin', async (id) => {
  try {
    const responseOrders = await axiosApi.get<Order[]>('/orders?admin=' + id);
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export interface ChangeStatusProps {
  id: string;
  status: string;
}

export const changeStatusOrder = createAsyncThunk<void, ChangeStatusProps>('orders/changeStatus', async (data) => {
  try {
    await axiosApi.patch('/orders/' + data.id, data.status);
  } catch {
    throw new Error();
  }
});

export const deleteOrder = createAsyncThunk<void, string>('orders/deleteOrder', async (id) => {
  try {
    await axiosApi.delete('/orders/' + id);
  } catch {
    throw new Error();
  }
});
