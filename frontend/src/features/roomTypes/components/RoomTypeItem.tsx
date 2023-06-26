import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDeleteRoomTypeLoading } from '../roomTypesSlice';
import { deleteRoomType } from '../roomTypesThunks';
import { Box, Card, DialogActions, DialogContent, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { someStyle } from '../../../styles';
import { IRoomType } from '../../../types';
import { useNavigate } from 'react-router-dom';

export interface Props {
  item: IRoomType;
}

const RoomTypeItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectDeleteRoomTypeLoading);
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const onHandleDeleteRoomType = async (id: string) => {
    await dispatch(deleteRoomType(id)).unwrap();
    await setOpen(false);
  };

  const onHandleEditRoomType = (id: string) => {
    navigate(`/my-cabinet/edit-roomType/${id}`);
  };

  return (
    <Card
      key={item._id}
      sx={{
        mb: 2,
        p: 2,
        maxWidth: '500px',
        boxShadow: someStyle.boxShadow,
      }}
    >
      <Typography key={item._id} textTransform="capitalize">
        {i18n.language === 'en' ? item.name.en : item.name.ru}
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          sx={{ background: '#05BFDB' }}
          size="small"
          variant="contained"
          onClick={() => onHandleEditRoomType(item._id)}
        >
          {t('edit')}
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ background: ' #CD1818' }}
          color="error"
          onClick={() => setOpen(true)}
        >
          {t('delete')}
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography variant="body1">Вы уверены, что хотите удалить выбранный тип комнаты?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
          <LoadingButton onClick={() => onHandleDeleteRoomType(item._id)} loading={loading === item._id}>
            {t('continue')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RoomTypeItem;
