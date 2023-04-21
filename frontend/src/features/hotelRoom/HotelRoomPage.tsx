import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const HotelRoomPage = () => {
  const services = ['1', '2', '3'];
  return (
    <>
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h4" component="p" textAlign={'center'}>
            {'Название отеля'}
          </Typography>
          <Typography>{'Количество комнат:'}</Typography>
          <Typography gutterBottom component="p">
            {'Стоимость:'}
          </Typography>

          <Typography gutterBottom component="p">
            {'Описание:'}
          </Typography>

          <Grid container xl>
            {services.map((service, index) => {
              return (
                <Grid container gap={1} item key={index} alignSelf={'center'}>
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

export default HotelRoomPage;
