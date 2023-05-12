import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AnonymousMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Button component={NavLink} to="/register" color="inherit">
        <Typography fontWeight="bold">{t('signUp')}</Typography>
      </Button>
      <Button component={NavLink} to="/login" color="inherit">
        <Typography fontWeight="bold">{t('signIn')}</Typography>
      </Button>
    </>
  );
};

export default AnonymousMenu;
