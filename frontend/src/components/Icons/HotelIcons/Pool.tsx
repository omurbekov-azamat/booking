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
        <Box
          borderRadius={5}
          marginX={1}
          padding={1}
          display="flex"
          alignItems="center"
          border={2}
          borderColor="orange"
        >
          <PoolIcon sx={{ color: '#000', fontSize: 24, marginRight: 3, marginLeft: 1 }} />
          <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#000' }}>
            {t('pool')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Pool;
