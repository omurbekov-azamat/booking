import React from 'react';
import { Box, Typography } from '@mui/material';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import { useTranslation } from 'react-i18next';
import PoolIcon from '@mui/icons-material/Pool';

interface Props {
  noSmoking: boolean;
}

const Smoking: React.FC<Props> = ({ noSmoking }) => {
  const { t } = useTranslation();
  return (
    <>
      {!noSmoking ? (
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
          <SmokeFreeIcon sx={{ color: '#000', fontSize: 24, marginRight: 3, marginLeft: 1 }} />
          <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#000' }}>
            {t('noneSmokingRoom')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Smoking;
