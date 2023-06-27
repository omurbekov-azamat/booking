import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CommentMutation, GlobalSuccess, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchAll',
  async (hotelId: string | undefined) => {
    try {
      const response = await axiosApi.get<Comment[]>('/comments?hotel=' + hotelId);
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const fetchOneComment = createAsyncThunk<Comment, string>('comments/fetchOne', async (id: string) => {
  try {
    const response = await axiosApi.get<Comment>('/comments/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const createComment = createAsyncThunk<
  GlobalSuccess,
  CommentMutation,
  { state: RootState; rejectValue: ValidationError }
>('comments/createComment', async (comment, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      const response = await axiosApi.post('/comments', comment);
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
  comment: CommentMutation;
  id: string;
}

export const updateComment = createAsyncThunk<
  GlobalSuccess,
  updatedData,
  { state: RootState; rejectValue: ValidationError }
>('comments/updateComment', async (updatedData, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      const response = await axiosApi.patch('/comments/' + updatedData.id, updatedData.comment);
      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const removeComment = createAsyncThunk<GlobalSuccess, string>('comments/removeOne', async (id) => {
  try {
    const response = await axiosApi.delete('/comments/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});
