import { createSlice } from '@reduxjs/toolkit';
import { Order, ValidationError } from '../../types';
import { changeStatusOrder, getOrders, sendOrder } from './ordersThunks';
import { RootState } from '../../app/store';

interface OrdersState {
  sendOrderLoading: boolean;
  sendOrderError: ValidationError | null;
  fetchOrdersLoading: boolean;
  orders: Order[];
  changeOrderStatusLoading: boolean;
}

const initialState: OrdersState = {
  sendOrderLoading: false,
  sendOrderError: null,
  fetchOrdersLoading: false,
  orders: [],
  changeOrderStatusLoading: false,
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
    builder.addCase(sendOrder.rejected, (state, { payload: error }) => {
      state.sendOrderLoading = false;
      state.sendOrderError = error || null;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.fetchOrdersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, { payload: orders }) => {
      state.fetchOrdersLoading = false;
      state.orders = orders;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.fetchOrdersLoading = false;
    });
    builder.addCase(changeStatusOrder.pending, (state) => {
      state.changeOrderStatusLoading = true;
    });
    builder.addCase(changeStatusOrder.fulfilled, (state) => {
      state.changeOrderStatusLoading = false;
    });
    builder.addCase(changeStatusOrder.rejected, (state) => {
      state.changeOrderStatusLoading = false;
    });
  },
});

export const ordersReducer = ordersSlice.reducer;

export const selectSendOrderLoading = (state: RootState) => state.orders.sendOrderLoading;
export const selectSendOrderError = (state: RootState) => state.orders.sendOrderError;
export const selectFetchOrdersLoading = (state: RootState) => state.orders.fetchOrdersLoading;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrderChangeStatusLoading = (state: RootState) => state.orders.changeOrderStatusLoading;
