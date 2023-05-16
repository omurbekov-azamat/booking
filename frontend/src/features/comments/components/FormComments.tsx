import React, { useState } from 'react';
import { Box, Card, CardContent, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

const FormComments = () => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    text: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
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
