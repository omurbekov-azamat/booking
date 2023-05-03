import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CommentMutation, ValidationError } from '../../types';
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

export const createComment = createAsyncThunk<
  void,
  CommentMutation,
  { state: RootState; rejectValue: ValidationError }
>('comments/createComment', async (comment, { getState, rejectWithValue }) => {
  try {
    const user = getState().users.user;

    if (user) {
      await axiosApi.post('/comments', comment);
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});
