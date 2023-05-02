import express from 'express';
import Comments from '../models/Comments';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const hotelId = req.query.hotelId as string;

    const comments = await Comments.find({ hotel: hotelId });
    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});
