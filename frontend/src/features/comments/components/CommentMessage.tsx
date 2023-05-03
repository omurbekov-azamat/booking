import React, { MouseEventHandler } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Comment } from '../../../types';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  comment: Comment;
  onDeleteBtnClick: MouseEventHandler;
  onEditBtnClick: MouseEventHandler;
}

const CommentMessage: React.FC<Props> = ({ comment, onDeleteBtnClick, onEditBtnClick }) => {
  const user = useAppSelector(selectUser);
  const deleteBtn = (
    <Button onClick={onDeleteBtnClick} variant={'outlined'} color={'error'}>
      Delete
    </Button>
  );
  const editBtn = (
    <Button onClick={onEditBtnClick} variant={'outlined'} color={'info'} sx={{ my: 1 }}>
      Edit
    </Button>
  );

  return (
    <Grid container flexDirection={'column'} border={1} my={2} p={2}>
      <Grid item>{'From: ' + comment.author.firstName + ' ' + comment.author.lastName} </Grid>
      <Grid item>
        <Typography variant={'h6'} component={'p'}>
          {comment.text}
        </Typography>
      </Grid>
      <Grid item>{dayjs(comment.createdAt).format('DD-MM-YYYY HH:mm')} </Grid>
      {user?._id === comment.author._id ? editBtn : null}
      {user?.role === 'admin' || user?.role === 'director' || user?._id === comment.author._id ? deleteBtn : null}
    </Grid>
  );
};

export default CommentMessage;
