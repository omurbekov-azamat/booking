import React from 'react';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material';

const WhatsAppButton = () => {
  const MyButton = styled(Button)({
    position: 'fixed',
    bottom: 40,
    right: 40,
    width: 50,
    height: 60,
    padding: 0,
    borderRadius: '50%',
    backgroundColor: '#25d366',
    '&:hover': {
      backgroundColor: '#128c7e',
    },
    zIndex: 9999,
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <MyButton>
          <WhatsAppIcon sx={{ color: '#ffffff' }} />
        </MyButton>
      </ThemeProvider>
    </>
  );
};

export default WhatsAppButton;
