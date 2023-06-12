import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PetsIcon from '@mui/icons-material/Pets';

interface Props {
  parking: boolean;
}

const Parking: React.FC<Props> = ({ parking }) => {
  const { t } = useTranslation();
  return (
    <>
      {!parking ? (
        ''
      ) : (
        <Box
          borderRadius={5}
          marginX={1}
          padding={1}
          display="flex"
          alignItems="center"
          border={2}
          borderColor="orange"
        >
          <LocalParkingIcon sx={{ color: '#000', fontSize: 24, marginRight: 3, marginLeft: 1 }} />
          <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#000' }}>
            {t('parking')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Parking;
