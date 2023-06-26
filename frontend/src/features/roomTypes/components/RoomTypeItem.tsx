import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@mui/material';
import { someStyle } from '../../../styles';
import Button from '@mui/material/Button';
import { IRoomType } from '../../../types';

export interface Props {
  item: IRoomType;
}

const RoomTypeItem: React.FC<Props> = ({ item }) => {
  const { t, i18n } = useTranslation();
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
      <Button size="small" variant="contained" sx={{ background: ' #CD1818' }} color="error">
        {t('delete')}
      </Button>
    </Card>
  );
};

export default RoomTypeItem;
