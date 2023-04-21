import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import ShowerIcon from '@mui/icons-material/Shower';

interface Props {
  bath: boolean;
}

const BathRoom: React.FC<Props> = ({ bath }) => {
  const { t } = useTranslation();
  return (
    <>
      {!bath ? (
        ''
      ) : (
        <Typography variant="body1">
          <ShowerIcon /> {t('bath')}
        </Typography>
      )}
    </>
  );
};

export default BathRoom;
