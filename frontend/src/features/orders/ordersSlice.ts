import { createSlice } from '@reduxjs/toolkit';
import { ValidationError } from '../../types';
import {sendOrder} from './ordersThunks';
import {RootState} from '../../app/store';

interface OrdersState {
  sendOrderLoading: boolean;
  sendOrderError: ValidationError | null;
}

const initialState: OrdersState = {
  sendOrderLoading: false,
  sendOrderError: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => {
      state.sendOrderError = null;
      state.sendOrderLoading = true;
    });
    builder.addCase(sendOrder.fulfilled, (state) => {
      state.sendOrderLoading = false;
    });
    builder.addCase(sendOrder.rejected, (state, {payload: error}) => {
      state.sendOrderLoading = false;
      state.sendOrderError = error || null;
    });
  },
});

export const ordersReducer = ordersSlice.reducer;

export const selectSendOrderLoading = (state: RootState) => state.orders.sendOrderLoading;
export const selectSendOrderError = (state: RootState) => state.orders.sendOrderError;