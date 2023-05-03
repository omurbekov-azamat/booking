import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectComments } from './commentsSlice';
import { fetchComments, removeComment } from './commentsThunks';
import { useNavigate, useParams } from 'react-router-dom';
import CommentMessage from './components/CommentMessage';

const Comments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const comments = useAppSelector(selectComments);

  const deleteComment = async (id: string) => {
    await dispatch(removeComment(id));
    await dispatch(fetchComments(id));
  };

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentMessage
            comment={comment}
            onDeleteBtnClick={() => deleteComment(id)}
            onEditBtnClick={() => navigate('/hotels/' + id + '/edit-comment')}
            key={comment._id}
          />
        );
      })}
    </>
  );
};

export default Comments;
