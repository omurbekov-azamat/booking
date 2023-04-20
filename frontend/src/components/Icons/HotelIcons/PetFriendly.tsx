import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

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
        <Box bgcolor="orange" borderRadius={3} paddingX={1} marginX={1} display="inline-block">
          <Typography
            variant="body1"
            display="inline-block"
            sx={{ borderRadius: '50%', border: 'medium', borderColor: '#FFF' }}
          >
            <PetsIcon />
          </Typography>
          <Typography
            variant="body1"
            component="span"
            display="inline-block"
            sx={{ fontWeight: 'bold', paddingLeft: '3px', margin: 'auto' }}
          >
            {t('petFriendly')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default PetFriendly;
