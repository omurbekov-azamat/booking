import React, { MouseEventHandler } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { apiURL } from '../../../constants';

interface Props {
  image: string;
  title: string;
  rating: number;
  onHotelClick: MouseEventHandler;
}

const HotelsCard: React.FC<Props> = ({ image, title, rating, onHotelClick }) => {
  const cardImage = apiURL + '/' + image;

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea onClick={onHotelClick}>
        <CardMedia component="img" height="140" image={cardImage} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign={'center'}>
            {title}
          </Typography>
          <Box textAlign={'center'}>
            <Rating name="read-only" value={rating} precision={0.5} readOnly />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HotelsCard;
