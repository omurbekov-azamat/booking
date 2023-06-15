import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
  icon: ReactJSXElement;
  text: string;
}

const CurveIcon: React.FC<Props> = ({ icon, text }) => {
  const { t } = useTranslation();
  return (
    <Grid item>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>{icon}</Grid>
        <Grid item>
          <span> {t(`${text}`)}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CurveIcon;
