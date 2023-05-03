import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectComments } from './commentsSlice';
import { fetchComments } from './commentsThunks';
import { useParams } from 'react-router-dom';
import CommentMessage from './components/CommentMessage';

const Comments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <>
      {comments.map((comment) => {
        return <CommentMessage comment={comment} key={comment._id} />;
      })}
    </>
  );
};

export default Comments;
