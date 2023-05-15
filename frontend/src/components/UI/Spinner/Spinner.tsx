import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" thickness={6} />
    </Box>
  );
};

export default Spinner;
