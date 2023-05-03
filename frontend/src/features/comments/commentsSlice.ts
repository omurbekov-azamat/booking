import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { Comment, ValidationError } from '../../types';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  loadingCreateComment: boolean;
  loadingRemoveComment: false | string;
  error: boolean;
  createCommentError: ValidationError | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  loadingCreateComment: false,
  loadingRemoveComment: false,
  error: false,
  createCommentError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoading = (state: RootState) => state.comments.loading;
export const selectLoadingCreateComment = (state: RootState) => state.comments.loadingCreateComment;
export const selectLoadingRemoveComment = (state: RootState) => state.comments.loadingRemoveComment;
export const selectCreateCommentError = (state: RootState) => state.comments.createCommentError;
