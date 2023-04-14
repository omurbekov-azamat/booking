import React from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div">
                {t('footerText')}
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;
