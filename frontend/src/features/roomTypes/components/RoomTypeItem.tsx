import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@mui/material';
import { IRoomType } from '../../../types';
import { someStyle } from '../../../styles';

export interface Props {
  item: IRoomType;
}

const RoomTypeItem: React.FC<Props> = ({ item }) => {
  const { i18n } = useTranslation();
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
    </Card>
  );
};

export default RoomTypeItem;
