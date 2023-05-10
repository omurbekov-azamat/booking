import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { getAdmins, getUsers, login, logout, reAuthorization, register } from './usersThunks';
import { RootState } from '../../app/store';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  logoutLoading: boolean;
  loginError: GlobalError | null;
  userLoading: boolean;
  modalCoverState: boolean;
  getAdminsLoading: boolean;
  admins: User[];
  users: User[];
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  logoutLoading: false,
  loginError: null,
  modalCoverState: false,
  getAdminsLoading: false,
  userLoading: false,
  admins: [],
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    openModalCover: (state) => {
      state.modalCoverState = true;
    },
    closeModalCover: (state) => {
      state.modalCoverState = false;
    },
    unsetCabinetUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(getAdmins.pending, (state) => {
      state.getAdminsLoading = true;
    });
    builder.addCase(getAdmins.fulfilled, (state, { payload: admins }) => {
      state.getAdminsLoading = false;
      state.admins = admins;
    });
    builder.addCase(getAdmins.rejected, (state) => {
      state.getAdminsLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload: users }) => {
      state.userLoading = false;
      state.users = users;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.userLoading = false;
    });
    builder.addCase(reAuthorization.fulfilled, (state, { payload: user }) => {
      state.user = user;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser, openModalCover, closeModalCover, unsetCabinetUsers } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;
export const selectModalCoverState = (state: RootState) => state.users.modalCoverState;
export const selectGetAdminsLoading = (state: RootState) => state.users.getAdminsLoading;
export const selectAdmins = (state: RootState) => state.users.admins;
export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.userLoading;
