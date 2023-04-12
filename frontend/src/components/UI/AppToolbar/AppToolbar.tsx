import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { AppBar, Box, Grid, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

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
              <Grid item>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default AppToolbar;
