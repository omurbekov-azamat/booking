import React from 'react';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  return (
    <>
      <Button>
        <WhatsAppIcon sx={{ color: '#ffffff' }} />
      </Button>
    </>
  );
};

export default WhatsAppButton;
