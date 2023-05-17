import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Typography } from '@mui/material';
import { CityOnMainPage } from '../../../types';

interface Props {
  item: CityOnMainPage;
}

const CityCard: React.FC<Props> = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={item.link} alt={item.link} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            padding: '8px',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            width: '100%',
            textTransform: 'capitalize',
          }}
        >
          {item.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CityCard;
