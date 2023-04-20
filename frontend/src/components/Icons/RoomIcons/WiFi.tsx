import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';

interface Props {
  wifi: boolean;
}

const WiFi: React.FC<Props> = ({ wifi }) => {
  const { t } = useTranslation();
  return (
    <>
      {!wifi ? (
        ''
      ) : (
        <Typography variant="body1">
          <WifiIcon /> {t('wiFi')}
        </Typography>
      )}
    </>
  );
};

export default WiFi;
