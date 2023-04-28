import React, { MouseEventHandler } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  image: string;
  title: string;
  rating: number;
  onHotelClick: MouseEventHandler;
}

const HotelsCard: React.FC<Props> = ({ id, image, title, rating, onHotelClick }) => {
  const cardImage = apiURL + '/' + image;
  const navigate = useNavigate();

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

      <Stack direction="row" spacing={2} justifyContent={'space-around'} mb={1}>
        <Button variant="contained" size="medium" onClick={() => navigate('/my-cabinet/edit/' + id)}>
          Edit
        </Button>

        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>

        <Button variant="outlined" color="error">
          Publish
        </Button>
      </Stack>
    </Card>
  );
};

export default HotelsCard;
