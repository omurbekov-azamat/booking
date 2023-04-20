import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

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
        <Box bgcolor="orange" borderRadius={3} paddingX={1} marginX={1} display="inline-block">
          <Typography
            variant="body1"
            display="inline-block"
            sx={{ borderRadius: '50%', border: 'medium', borderColor: '#FFF' }}
          >
            <LocalParkingIcon />
          </Typography>
          <Typography
            variant="body1"
            component="span"
            display="inline-block"
            sx={{ fontWeight: 'bold', paddingLeft: '3px', margin: 'auto' }}
          >
            {t('parking')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Parking;
