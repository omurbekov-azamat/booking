import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import PoolIcon from '@mui/icons-material/Pool';

interface Props {
  pool: boolean;
}

const Pool: React.FC<Props> = ({ pool }) => {
  const { t } = useTranslation();
  return (
    <>
      {!pool ? (
        ''
      ) : (
        <Box bgcolor="orange" borderRadius={3} marginX={1} paddingX={1} display="inline-block">
          <Typography
            variant="body1"
            display="inline-block"
            sx={{ borderRadius: '50%', border: 'medium', borderColor: '#FFF' }}
          >
            <PoolIcon />
          </Typography>
          <Typography
            variant="body1"
            component="span"
            display="inline-block"
            sx={{ fontWeight: 'bold', paddingLeft: '3px', margin: 'auto' }}
          >
            {t('pool')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Pool;
