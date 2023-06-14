import React, { useState } from 'react';
import { Box, Card, CardContent, TextField } from '@mui/material';
import { selectCreateCommentError, selectLoadingCreateComment } from '../commentsSlice';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createComment, fetchComments, updateComment } from '../commentsThunks';
import { CommentMutation } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  hotelId?: string;
  isEdit?: boolean;
  commentId?: string;
  editedComment?: CommentMutation;
}

const FormComments: React.FC<Props> = ({ hotelId, isEdit, commentId, editedComment }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const ErrorCreateComment = useAppSelector(selectCreateCommentError);
  const loadingCreateComment = useAppSelector(selectLoadingCreateComment);
  const navigate = useNavigate();

  const initialState = editedComment
    ? {
        ...editedComment,
      }
    : {
        hotel: hotelId as string,
        text: '',
      };

  const [state, setState] = useState<CommentMutation>(initialState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && commentId) {
      await dispatch(updateComment({ id: commentId, comment: state })).unwrap();
      navigate('/hotels/' + hotelId);
    } else {
      await dispatch(createComment(state)).unwrap();
      await dispatch(fetchComments(hotelId as string));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return ErrorCreateComment?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Box mt={10} component="form" onSubmit={submitFormHandler}>
      <Card>
        <CardContent>
          <TextField
            value={state.text}
            onChange={inputChangeHandler}
            multiline
            name="text"
            rows={4}
            fullWidth={true}
            label={isEdit ? 'Edit comment' : 'Write comment...'}
            id="fullWidth"
            error={Boolean(getFieldError('text'))}
            helperText={getFieldError('text')}
          />
          <Box textAlign="center" mt={3}>
            <LoadingButton
              loading={loadingCreateComment}
              variant="contained"
              type="submit"
              color="success"
              sx={{ background: '#03C988' }}
            >
              {isEdit ? t('edit') : t('send')}
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormComments;
