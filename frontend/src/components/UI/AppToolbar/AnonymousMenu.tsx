import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AccountCircle, LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(29,53,4,0.9)',
    },
    secondary: {
      main: 'rgb(255,255,255)',
    },
  },
});

const AnonymousMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item mr={1} mb={1} alignItems="center">
            <Button
              component={NavLink}
              to="/register"
              variant="outlined"
              startIcon={<AccountCircle />}
              color="secondary"
            >
              <Typography mt={0.5} fontWeight="bold">
                {t('signUp')}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button component={NavLink} to="/login" variant="outlined" startIcon={<LockOutlined />} color="secondary">
              <Typography mt={0.5} fontWeight="bold">
                {t('signIn')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default AnonymousMenu;
