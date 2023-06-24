import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectComments, selectLoadingFetchAllComments } from './commentsSlice';
import { fetchComments, removeComment } from './commentsThunks';
import { useNavigate, useParams } from 'react-router-dom';
import CommentMessage from './components/CommentMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormComments from './components/FormComments';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../users/usersSlice';

const Comments = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams() as { id: string };
  const comments = useAppSelector(selectComments);
  const loadingFetchAllComments = useAppSelector(selectLoadingFetchAllComments);
  const user = useAppSelector(selectUser);

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
      <Card sx={{ mt: 2, px: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ my: 2, fontWeight: 'bolder', color: 'grey' }}>
            {t('comments') + ': ' + comments.length}
          </Typography>
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
          {user?.isVerified && user?.role !== 'hotel' && <FormComments hotelId={id} />}
        </CardContent>
      </Card>
    </>
  );
};

export default Comments;
