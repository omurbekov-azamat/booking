import React from 'react';
import { Button, Grid } from '@mui/material';
import { Comment } from '../../../types';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  comment: Comment;
}

const CommentMessage: React.FC<Props> = ({ comment }) => {
  const user = useAppSelector(selectUser);
  const deleteBtn = <Button>Delete</Button>;
  const editBtn = <Button>Edit</Button>;

  return (
    <Grid container>
      <Grid item>{comment.author} </Grid>
      <Grid item>{comment.text} </Grid>
      <Grid item>{dayjs(comment.createdAt).format('DD-MM-YYYY HH:mm')} </Grid>
      {user?.role === 'admin' || user?.role === 'director' || user?._id === comment.author ? deleteBtn : null}
      {user?._id === comment.author ? editBtn : null}
    </Grid>
  );
};

export default CommentMessage;
