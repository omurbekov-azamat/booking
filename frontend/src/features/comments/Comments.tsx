import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectComments, selectLoadingFetchAllComments } from './commentsSlice';
import { fetchComments, removeComment } from './commentsThunks';
import { useNavigate, useParams } from 'react-router-dom';
import CommentMessage from './components/CommentMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormComments from './components/FormComments';

const Comments = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const comments = useAppSelector(selectComments);
  const loadingFetchAllComments = useAppSelector(selectLoadingFetchAllComments);

  const deleteComment = async (commentId: string, hotelId: string) => {
    await dispatch(removeComment(commentId));
    await dispatch(fetchComments(hotelId));
  };

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <>
      {loadingFetchAllComments && <Spinner />}
      {comments.map((comment) => {
        return (
          <CommentMessage
            comment={comment}
            onDeleteBtnClick={() => deleteComment(comment._id, id)}
            onEditBtnClick={() => navigate('/comments/' + comment._id + '/edit-comment')}
            key={comment._id}
          />
        );
      })}
      <FormComments hotelId={id} />
    </>
  );
};

export default Comments;
