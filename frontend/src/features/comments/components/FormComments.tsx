import React, { useState } from 'react';
import { Box, Card, CardContent, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { CommentMutation } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { createComment } from '../commentsThunks';

interface Props {
  hotelId: string;
}

const FormComments: React.FC<Props> = ({ hotelId }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
          />
          <Box textAlign="center" mt={3}>
            <LoadingButton variant="contained" type="submit">
              {t('send')}
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormComments;
