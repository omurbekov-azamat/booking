import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
  spacing: number;
  text: string | ReactJSXElement;
  tooltipInformation: ReactJSXElement;
  icon?: ReactJSXElement;
  color?: string;
}

const CurveGrid: React.FC<Props> = ({ spacing, text, tooltipInformation, icon, color }) => {
  return (
    <Grid container alignItems="center" spacing={spacing}>
      <Grid item>{text}</Grid>
      {icon && <Grid item>{icon}</Grid>}
      <Grid item>
        <Tooltip title={tooltipInformation}>
          <HelpIcon sx={{ color }} />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default CurveGrid;
