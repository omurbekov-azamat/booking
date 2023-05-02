import express from 'express';
import Comment from '../models/Comments';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const hotelId = req.query.hotelId as string;

    const comments = await Comment.find({ hotel: hotelId });
    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const newComment = new Comment({
      author: user._id,
      hotel: req.body.hotel,
      text: req.body.text,
      createdAt: new Date(),
    });

    await newComment.save();
    return res.send({ message: 'Created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

commentsRouter.patch('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: user._id },
      { text: req.body.text },
      { new: true, runValidators: true },
    );

    if (!comment) {
      return res.status(403).send({ message: 'Forbidden' });
    }

    return res.status(200).send({ message: 'Comment updated successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});
