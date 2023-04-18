import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AnonymousMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Button component={NavLink} to="/register" color="inherit">
        {t('signUp')}
      </Button>
      <Button component={NavLink} to="/login" color="inherit">
        {t('signIn')}
      </Button>
    </>
  );
};

export default AnonymousMenu;
