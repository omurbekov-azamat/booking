import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';

interface Props {
  aircon: boolean;
}

const Aircon: React.FC<Props> = ({ aircon }) => {
  const { t } = useTranslation();
  return (
    <>
      {!aircon ? (
        ''
      ) : (
        <Typography variant="body1">
          <AcUnitIcon /> {t('cond')}
        </Typography>
      )}
    </>
  );
};

export default Aircon;
