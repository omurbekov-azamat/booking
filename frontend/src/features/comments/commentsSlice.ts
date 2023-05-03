import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { Comment, ValidationError } from '../../types';
import { createComment, fetchComments, removeComment, updateComment } from './commentsThunks';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  loadingCreateComment: boolean;
  loadingRemoveComment: false | string;
  loadingUpdateComment: boolean;
  error: boolean;
  createCommentError: ValidationError | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  loadingCreateComment: false,
  loadingRemoveComment: false,
  loadingUpdateComment: false,
  error: false,
  createCommentError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(createComment.pending, (state) => {
      state.loadingCreateComment = true;
      state.createCommentError = null;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.loadingCreateComment = false;
    });
    builder.addCase(createComment.rejected, (state, { payload: error }) => {
      state.loadingCreateComment = false;
      state.createCommentError = error || null;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.loadingUpdateComment = true;
      state.error = false;
    });
    builder.addCase(updateComment.fulfilled, (state) => {
      state.loadingUpdateComment = false;
      state.error = false;
    });
    builder.addCase(updateComment.rejected, (state) => {
      state.loadingUpdateComment = false;
      state.error = true;
    });
    builder.addCase(removeComment.pending, (state, { meta }) => {
      state.loadingRemoveComment = meta.arg;
      state.error = false;
    });
    builder.addCase(removeComment.fulfilled, (state) => {
      state.loadingRemoveComment = false;
      state.error = false;
    });
    builder.addCase(removeComment.rejected, (state) => {
      state.loadingRemoveComment = false;
      state.error = true;
    });
  },
});
export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoading = (state: RootState) => state.comments.loading;
export const selectLoadingCreateComment = (state: RootState) => state.comments.loadingCreateComment;
export const selectLoadingUpdateComment = (state: RootState) => state.comments.loadingUpdateComment;
export const selectLoadingRemoveComment = (state: RootState) => state.comments.loadingRemoveComment;
export const selectCreateCommentError = (state: RootState) => state.comments.createCommentError;
