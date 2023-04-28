import React, { MouseEventHandler } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchHotels, removeHotel, togglePublishedHotel } from '../hotelsThunks';
import { selectUser } from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: string;
  image: string;
  title: string;
  rating: number;
  onHotelClick: MouseEventHandler;
  publish: boolean;
  userId: string;
}

const HotelsCard: React.FC<Props> = ({ userId, publish, id, image, title, rating, onHotelClick }) => {
  const cardImage = apiURL + '/' + image;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const unPublishButton = async () => {
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
          <Typography gutterBottom variant="h5" align="center">
            {title}
          </Typography>
          <Box textAlign="center">
            <Rating name="read-only" value={rating} precision={0.5} readOnly />
          </Box>
        </CardContent>
      </CardActionArea>

      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around" mb={1}>
          <Button variant="contained" size="medium" onClick={() => navigate('/my-cabinet/edit/' + id)}>
            Edit
          </Button>

          {(user?.role === 'admin' || user?.role === 'director' || user?._id === userId) && (
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteButton}>
              Delete
            </Button>
          )}

          <Button variant="outlined" color="error" onClick={unPublishButton}>
            Publish
          </Button>
        </Stack>
      </Box>

      <Box textAlign="center">
        <Typography color="red">{!publish && 'Un publish'}</Typography>
      </Box>
    </Card>
  );
};

export default HotelsCard;
