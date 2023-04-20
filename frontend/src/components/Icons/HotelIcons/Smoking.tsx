import React from 'react';
import { Box, Typography } from '@mui/material';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import { useTranslation } from 'react-i18next';

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
        <Box bgcolor="orange" borderRadius={3} paddingX={1} marginX={1} display="inline-block">
          <Typography variant="body1" display="inline-block">
            <SmokeFreeIcon />
          </Typography>
          <Typography
            variant="body1"
            component="span"
            display="inline-block"
            sx={{ fontWeight: 'bold', paddingLeft: '3px', margin: 'auto' }}
          >
            {t('noneSmokingRoom')}
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Smoking;
