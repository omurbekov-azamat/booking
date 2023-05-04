import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface currencyState {
  currency: string;
}

const initialState: currencyState = {
  currency: 'kgs',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});
export const currencyReducer = currencySlice.reducer;

export const { changeCurrency } = currencySlice.actions;
export const selectCurrency = (state: RootState) => state.currency.currency;
