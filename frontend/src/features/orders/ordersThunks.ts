import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { GlobalSuccess, Order, OrderSend, ValidationError } from '../../types';

export const sendOrder = createAsyncThunk<GlobalSuccess, OrderSend, { state: RootState; rejectValue: ValidationError }>(
  'orders/sendOrder',
  async (order, { getState, rejectWithValue }) => {
    const user = getState().users.user;
    try {
      if (user) {
        const response = await axiosApi.post('/orders', order);
        return response.data;
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

export const changeStatusOrder = createAsyncThunk<GlobalSuccess, ChangeStatusProps>(
  'orders/changeStatus',
  async (data) => {
    try {
      const response = await axiosApi.patch<GlobalSuccess>('/orders/' + data.id, { status: data.status });
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const deleteOrder = createAsyncThunk<GlobalSuccess, string>('orders/deleteOrder', async (id) => {
  try {
    const response = await axiosApi.delete<GlobalSuccess>('/orders/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

interface UseBonusProps {
  id: string;
  bonusUse: number;
}

export const useBonusOnOrder = createAsyncThunk<GlobalSuccess, UseBonusProps>('orders/useBonus', async (data) => {
  try {
    const response = await axiosApi.patch(`/orders/useBonus/${data.id}`, { bonusUse: data.bonusUse });
    return response.data;
  } catch {
    throw new Error();
  }
});
