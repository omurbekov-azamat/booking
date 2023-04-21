import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';

interface Props {
  tv: boolean;
}

const Tv: React.FC<Props> = ({ tv }) => {
  const { t } = useTranslation();
  return (
    <>
      {!tv ? (
        ''
      ) : (
        <Typography variant="body1">
          <TvIcon /> {t('tv')}
        </Typography>
      )}
    </>
  );
};

export default Tv;
