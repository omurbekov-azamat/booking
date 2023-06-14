import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  name: string;
  data?: string | number;
}

const CurveText: React.FC<Props> = ({ name, data }) => {
  const { t } = useTranslation();
  return (
    <Typography variant="subtitle1" fontWeight="bold" p={1}>
      {t(`${name}`)}: {data}
    </Typography>
  );
};

export default CurveText;
