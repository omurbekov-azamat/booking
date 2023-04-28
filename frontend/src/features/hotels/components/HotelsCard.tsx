import React, { MouseEventHandler } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { fetchHotels, removeHotel, togglePublishedHotel } from '../hotelsThunks';

interface Props {
  id: string;
  image: string;
  title: string;
  rating: number;
  onHotelClick: MouseEventHandler;
  publish: boolean;
}

const HotelsCard: React.FC<Props> = ({ publish, id, image, title, rating, onHotelClick }) => {
  const cardImage = apiURL + '/' + image;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const unPublishedButton = async () => {
    await dispatch(togglePublishedHotel(id));
    await dispatch(fetchHotels());
  };

  const deleteButton = async () => {
    await dispatch(removeHotel(id));
    await dispatch(fetchHotels());
  };

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

        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteButton}>
          Delete
        </Button>

        <Button variant="outlined" color="error" onClick={() => unPublishedButton}>
          Publish
        </Button>
      </Stack>
      <Box textAlign={'center'}>
        <Typography color={'red'}>{!publish && 'Un Publish'}</Typography>
      </Box>
    </Card>
  );
};

export default HotelsCard;
