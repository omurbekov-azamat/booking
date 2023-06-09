import React from 'react';
import royal from '../../../assets/images/royal.png';
import { Box } from '@mui/material';

const RoyalStyles = {
  backgroundColor: 'grey',
  backgroundImage: 'url(' + royal + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '70%',
  backgroundPosition: 'center',
  display: 'inline-block',
  fontSize: '20px',
  color: '#FFFF00',
  border: '2px solid black',
  borderRadius: '10px',
};

const Royal = () => {
  return (
    <Box sx={{ fontFamily: 'Monospace', fontStyle: 'oblique' }} style={RoyalStyles}>
      Royal
    </Box>
  );
};

export default Royal;
