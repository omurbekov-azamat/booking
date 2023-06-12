import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PoolIcon from '@mui/icons-material/Pool';

interface Props {
  petFriendly: boolean;
}

const PetFriendly: React.FC<Props> = ({ petFriendly }) => {
  const { t } = useTranslation();
  return (
    <>
      {!petFriendly ? (
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
          <PetsIcon sx={{ color: '#000', fontSize: 24, marginRight: 3, marginLeft: 1 }} />
          <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#000' }}>
            {t('petFriendly')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default PetFriendly;
