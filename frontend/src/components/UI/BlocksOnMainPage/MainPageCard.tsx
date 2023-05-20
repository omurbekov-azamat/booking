import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid, Typography, Box } from '@mui/material';
import { BlockOnMainPage } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: BlockOnMainPage;
  city?: boolean;
  type?: boolean;
}

const MainPageCard: React.FC<Props> = ({ item, city, type }) => {
  const navigate = useNavigate();
  const onClickCard = (item: string) => {
    if (city) {
      navigate(`/dashboard/${item}/${false}`);
    } else if (type) {
      navigate(`/dashboard/${false}/${item}`);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box
        sx={{
          '&:hover': {
            '& div': {
              background: 'rgba(184, 233, 134, 0.8)', // Light pastel green with transparency on hover
            },
          },
        }}
        onClick={() => onClickCard(item.lang)}
      >
        <Card style={{ maxWidth: '350px', maxHeight: 'auto' }}>
          <CardActionArea>
            <CardMedia component="img" width="100%" height="200px" image={item.link} alt={item.link} />
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
      </Box>
    </Grid>
  );
};

export default MainPageCard;