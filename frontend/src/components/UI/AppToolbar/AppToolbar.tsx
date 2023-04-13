import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { AppBar, Box, Grid, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useTranslation } from 'react-i18next';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div">
                <Link to="/">Booking</Link>
              </Typography>
              <Grid item>
                <button onClick={() => changeLanguage('en')}>EN</button>
                <button onClick={() => changeLanguage('ru')}>RU</button>
                <div>{t('text')}</div>
              </Grid>
              <Grid item>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default AppToolbar;
