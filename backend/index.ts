import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import hotelsRouter from './routers/hotels';
import roomTypesRouter from './routers/roomTypes';
import apartmentsRouter from './routers/apartments';
import ordersRouter from './routers/orders';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public/'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);
app.use('/roomTypes', roomTypesRouter);
app.use('/apartments', apartmentsRouter);
app.use('/orders', ordersRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
