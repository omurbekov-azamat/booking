import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

interface Props {
  family: boolean;
}

const Family: React.FC<Props> = ({ family }) => {
  const { t } = useTranslation();
  return (
    <>
      {!family ? (
        ''
      ) : (
        <Typography variant="body1">
          <FamilyRestroomIcon /> {t('family')}
        </Typography>
      )}
    </>
  );
};

export default Family;
