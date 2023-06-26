import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import { Card, DialogActions, DialogContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { someStyle } from '../../../styles';
import { IRoomType } from '../../../types';

export interface Props {
  item: IRoomType;
}

const RoomTypeItem: React.FC<Props> = ({ item }) => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <Card
      key={item._id}
      sx={{
        mb: 2,
        p: 2,
        maxWidth: '500px',
        boxShadow: someStyle.boxShadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Typography key={item._id} textTransform="capitalize">
        {i18n.language === 'en' ? item.name.en : item.name.ru}
      </Typography>
      <Button sx={{ background: '#05BFDB' }} size="small" variant="contained">
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography variant="body1">Вы уверены, что хотите удалить выбранный тип комнаты?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
          <LoadingButton>{t('continue')}</LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RoomTypeItem;
