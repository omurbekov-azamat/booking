import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  user: User | null;
}

const initialState: UsersState = {
  user: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
