import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';

interface Props {
  towel: boolean;
}

const Towel: React.FC<Props> = ({ towel }) => {
  const { t } = useTranslation();
  return (
    <>
      {!towel ? (
        ''
      ) : (
        <Typography variant="body1">
          <DryCleaningIcon /> {t('towel')}
        </Typography>
      )}
    </>
  );
};

export default Towel;
