import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem, styled } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../../../features/users/usersThunks';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  const handleLogout = async () => {
    await dispatch(logout());
    await navigate('/');
  };

  return (
    <>
      <Grid container>
        <Button onClick={handleClick} color="inherit">
          {t('hello')}, {user.firstName} {user.lastName}
        </Button>
      </Grid>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Link to={'/profile'}>{t('profile')}</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
