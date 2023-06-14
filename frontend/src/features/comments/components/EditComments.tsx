import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectComment, selectLoadingFetchOneComment } from '../commentsSlice';
import { fetchOneComment } from '../commentsThunks';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FormComments from './FormComments';
import { selectOneHotel } from '../../hotels/hotelsSlice';

const EditComments = () => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector(selectComment);
  const hotel = useAppSelector(selectOneHotel);
  const loading = useAppSelector(selectLoadingFetchOneComment);
  const { id } = useParams() as { id: string };

  const editedComment = {
    hotel: hotel?._id as string,
    text: comment?.text as string,
  };

  useEffect(() => {
    dispatch(fetchOneComment(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <FormComments isEdit={true} commentId={id} hotelId={hotel?._id} editedComment={editedComment} />
      )}
    </div>
  );
};

export default EditComments;
