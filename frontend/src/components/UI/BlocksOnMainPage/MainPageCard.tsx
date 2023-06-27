import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActionArea, Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import { BlockOnMainPage } from '../../../types';

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
              background: 'rgba(3,201,136, 0.85)',
            },
          },
        }}
        onClick={() => onClickCard(item.lang)}
      >
        <Card
          style={{
            minHeight: '200px',
            backgroundImage: `url(${item.link})`,
            backgroundSize: 'cover',
          }}
        >
          <CardActionArea>
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
