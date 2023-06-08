import React from 'react';
import { AppBar, Box, Container, Divider, Grid, Link, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FooterStyle } from '../../../styles';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, mt: 1 }}>
      <AppBar position="static" sx={FooterStyle}>
        <Toolbar sx={{ paddingY: '10px' }}>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="center" spacing={0.5}>
              <Grid container item direction="column" xs={12} md={3}>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                >
                  +996 558 389288 <WhatsAppIcon style={{ marginLeft: '4px' }} />
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                >
                  +996 556 829978
                  <CallIcon style={{ marginLeft: '4px' }} />
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                >
                  +996 505 000024
                  <CallIcon style={{ marginLeft: '4px' }} />
                </Typography>
              </Grid>
              <Grid container item xs={12} md={3}>
                <Link
                  href="http://www.eventm.kg/"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img style={{ maxWidth: '250px' }} src="/logo.png" alt="logo" />
                </Link>
              </Grid>
              <Grid container item direction="column" xs={12} md={5}>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                >
                  <EmailIcon style={{ marginRight: '4px' }} /> conference@eventm.kg
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                >
                  <Link
                    href="https://www.instagram.com/eventm_agency"
                    color="#FFF"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <InstagramIcon style={{ marginRight: '4px' }} /> Eventm_agency
                  </Link>
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
                >
                  {t('footerAddress')}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container justifyContent="space-around">
              <Grid item>
                <Link
                  href={'/privacy-policy'}
                  sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Политика конфиденциальности
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={'/contract-offer'}
                  sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Договор оферты
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
