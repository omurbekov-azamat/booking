import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, Rating } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useTranslation } from 'react-i18next';
import { apiURL } from '../../../constants';

interface Props {
  title: string;
  rating: number;
  image: string;
  description: string;
  id: string;
  services: string[];
}

const HotelFull: React.FC<Props> = ({ title, rating, image, description, services, id }) => {
  const cardImage = apiURL + '/' + image;
  const { t } = useTranslation();

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" component="p" textAlign={'center'}>
            {title}
          </Typography>
          <Box textAlign={'center'}>
            <Rating name="read-only" value={rating} precision={0.5} readOnly />
          </Box>
          <CardMedia component="img" height="auto" width="100" image={cardImage} title={title} />
          <Typography variant="body2" color="text.secondary" fontSize={24}>
            {description}
          </Typography>
          <Typography gutterBottom component="p">
            {t('extraServices')}
          </Typography>
          <Grid container xl>
            {services.map((service) => {
              return (
                <Grid container gap={1} item key={id} alignSelf={'center'}>
                  <Grid item>
                    <TaskAltIcon />
                  </Grid>
                  <Grid item sx={{ fontSize: 17 }}>
                    {service}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default HotelFull;
