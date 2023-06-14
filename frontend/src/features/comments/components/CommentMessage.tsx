import React, { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import dayjs from 'dayjs';
import { Button, Grid, Typography } from '@mui/material';
import { Comment } from '../../../types';

interface Props {
  comment: Comment;
  onDeleteBtnClick?: MouseEventHandler;
  onEditBtnClick?: MouseEventHandler;
}

const CommentMessage: React.FC<Props> = ({ comment, onDeleteBtnClick, onEditBtnClick }) => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const deleteBtn = (
    <Button onClick={onDeleteBtnClick} variant="contained" color="error" size="small" sx={{ background: '#CD1818' }}>
      {t('delete')}
    </Button>
  );
  const editBtn = (
    <Button
      onClick={onEditBtnClick}
      variant="contained"
      size="small"
      color={'info'}
      sx={{ my: 1, background: '#05BFDB' }}
    >
      {t('edit')}
    </Button>
  );

  return (
    <Grid
      container
      flexDirection={'column'}
      sx={{
        border: 1,
        p: 2,
        mb: 3,
        boxShadow: 1,
        borderRadius: 2,
        borderColor: 'lightgray',
      }}
      spacing={1}
    >
      <Grid item>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>{comment.author.firstName + ' ' + comment.author.lastName + ':'}</Grid>
          <Grid item>{dayjs(comment.createdAt).format('DD-MM-YYYY HH:mm')} </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant={'h6'} component={'p'}>
          {comment.text}
        </Typography>
      </Grid>
      {user?._id === comment.author._id ? editBtn : null}
      {user?.role === 'admin' || user?.role === 'director' || user?._id === comment.author._id ? deleteBtn : null}
    </Grid>
  );
};

export default CommentMessage;
