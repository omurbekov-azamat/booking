import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

interface Props {
  food: boolean;
}

const Food: React.FC<Props> = ({ food }) => {
  const { t } = useTranslation();
  return (
    <>
      {!food ? (
        ''
      ) : (
        <Typography variant="body1">
          <DinnerDiningIcon /> {t('food')}
        </Typography>
      )}
    </>
  );
};

export default Food;
