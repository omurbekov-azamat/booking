import React, { useState } from 'react';
import { Box, Card, CardContent, TextField } from '@mui/material';
import { selectCreateCommentError, selectLoadingCreateComment } from '../commentsSlice';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createComment, fetchComments } from '../commentsThunks';
import { CommentMutation } from '../../../types';

interface Props {
  hotelId: string;
}

const FormComments: React.FC<Props> = ({ hotelId }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const ErrorCreateComment = useAppSelector(selectCreateCommentError);
  const loadingCreateComment = useAppSelector(selectLoadingCreateComment);

  const [state, setState] = useState<CommentMutation>({
    hotel: hotelId,
    text: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createComment(state)).unwrap();
    await dispatch(fetchComments(hotelId));
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
            label="Write comment..."
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
              sx={{ background: '#0E8388' }}
            >
              {t('send')}
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormComments;
