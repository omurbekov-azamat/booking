import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import BalconyIcon from '@mui/icons-material/Balcony';

interface Props {
  balcony: boolean;
}

const Balcony: React.FC<Props> = ({ balcony }) => {
  const { t } = useTranslation();
  return (
    <>
      {!balcony ? (
        ''
      ) : (
        <Typography variant="body1">
          <BalconyIcon /> {t('balcony')}
        </Typography>
      )}
    </>
  );
};

export default Balcony;
