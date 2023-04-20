import React from 'react';
import { Typography } from '@mui/material';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

interface Props {
  place: number;
}

const Place: React.FC<Props> = ({ place }) => {
  return (
    <>
      <Typography variant="body1">
        <SquareFootIcon /> {place} m <sup>2</sup>
      </Typography>
    </>
  );
};

export default Place;
