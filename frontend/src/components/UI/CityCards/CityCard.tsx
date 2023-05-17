import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid, Typography } from '@mui/material';
import { CityOnMainPage } from '../../../types';

interface Props {
  item: CityOnMainPage;
}

const CityCard: React.FC<Props> = ({ item }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ maxWidth: '345px', maxHeight: '300px' }}>
        <CardActionArea>
          <CardMedia component="img" width="100%" height="auto" image={item.link} alt={item.link} />
          <Typography
            variant="h5"
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
    </Grid>
  );
};

export default CityCard;
