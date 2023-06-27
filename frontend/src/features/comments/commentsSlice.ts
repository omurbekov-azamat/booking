import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { Comment, GlobalSuccess, ValidationError } from '../../types';
import { createComment, fetchComments, fetchOneComment, removeComment, updateComment } from './commentsThunks';

interface CommentsState {
  loadingFetchAllComments: boolean;
  comments: Comment[];
  comment: Comment | null;
  loadingCreateComment: boolean;
  loadingFetchOneComment: boolean;
  loadingRemoveComment: false | string;
  loadingUpdateComment: boolean;
  commentsSuccess: GlobalSuccess | null;
  error: boolean;
  createCommentError: ValidationError | null;
}

const initialState: CommentsState = {
  comments: [],
  comment: null,
  loadingFetchAllComments: false,
  loadingFetchOneComment: false,
  loadingCreateComment: false,
  loadingRemoveComment: false,
  loadingUpdateComment: false,
  commentsSuccess: null,
  error: false,
  createCommentError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsSuccessNull: (state) => {
      state.commentsSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loadingFetchAllComments = true;
      state.error = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loadingFetchAllComments = false;
      state.comments = action.payload;
      state.error = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loadingFetchOneComment = false;
      state.error = true;
    });
    builder.addCase(fetchOneComment.pending, (state) => {
      state.loadingFetchOneComment = true;
      state.error = false;
    });
    builder.addCase(fetchOneComment.fulfilled, (state, action) => {
      state.loadingFetchOneComment = false;
      state.comment = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOneComment.rejected, (state) => {
      state.loadingFetchAllComments = false;
      state.error = true;
    });
    builder.addCase(createComment.pending, (state) => {
      state.loadingCreateComment = true;
      state.createCommentError = null;
    });
    builder.addCase(createComment.fulfilled, (state, { payload: success }) => {
      state.loadingCreateComment = false;
      state.commentsSuccess = success;
    });
    builder.addCase(createComment.rejected, (state, { payload: error }) => {
      state.loadingCreateComment = false;
      state.createCommentError = error || null;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.loadingUpdateComment = true;
      state.error = false;
    });
    builder.addCase(updateComment.fulfilled, (state, { payload: success }) => {
      state.loadingUpdateComment = false;
      state.commentsSuccess = success;
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
    builder.addCase(removeComment.fulfilled, (state, { payload: success }) => {
      state.loadingRemoveComment = false;
      state.commentsSuccess = success;
      state.error = false;
    });
    builder.addCase(removeComment.rejected, (state) => {
      state.loadingRemoveComment = false;
      state.error = true;
    });
  },
});
export const commentsReducer = commentsSlice.reducer;

export const { setCommentsSuccessNull } = commentsSlice.actions;

export const selectLoadingFetchAllComments = (state: RootState) => state.comments.loadingFetchAllComments;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoadingCreateComment = (state: RootState) => state.comments.loadingCreateComment;
export const selectLoadingUpdateComment = (state: RootState) => state.comments.loadingUpdateComment;
export const selectLoadingRemoveComment = (state: RootState) => state.comments.loadingRemoveComment;
export const selectCreateCommentError = (state: RootState) => state.comments.createCommentError;
export const selectCommentsSuccess = (state: RootState) => state.comments.commentsSuccess;
export const selectLoadingFetchOneComment = (state: RootState) => state.comments.loadingFetchOneComment;
export const selectComment = (state: RootState) => state.comments.comment;
