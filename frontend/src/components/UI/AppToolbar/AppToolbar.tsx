import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { AppBar, Box, Grid, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useTranslation } from 'react-i18next';
import RUIcon from '../../../assets/images/russiaIcon.png';
import USAIcon from '../../../assets/images/usaIcon.png';
import CurrencySwitcher from '../../../features/currency/CurrencySwitcher';

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div">
              <Link to="/">Booking</Link>
            </Typography>
            <Grid item>
              <IconButton style={{ width: 35, height: 35, padding: 0 }} onClick={() => changeLanguage('ru')}>
                <img src={RUIcon} alt="ru language" style={{ width: '100%', height: 'auto' }} />
              </IconButton>
              <IconButton style={{ width: 35, height: 35, padding: 0 }} onClick={() => changeLanguage('en')}>
                <img src={USAIcon} alt="eng language" style={{ width: '100%', height: 'auto' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6" display="inline-block">
                {t('currency')}
              </Typography>
              <CurrencySwitcher />
            </Grid>
            <Grid item>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
