import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectComment, selectLoadingFetchOneComment } from '../commentsSlice';
import { fetchOneComment } from '../commentsThunks';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FormComments from './FormComments';

const EditComments = () => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector(selectComment);
  const loading = useAppSelector(selectLoadingFetchOneComment);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(fetchOneComment(id));
  }, [dispatch, id]);

  return <div>{loading ? <Spinner /> : <FormComments isEdit={true} />}</div>;
};

export default EditComments;
