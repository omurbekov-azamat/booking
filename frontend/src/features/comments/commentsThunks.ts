import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import axiosApi from '../../axiosApi';

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
