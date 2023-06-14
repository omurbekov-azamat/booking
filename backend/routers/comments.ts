import express from 'express';
import Comment from '../models/Comments';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import permit from '../middleware/permit';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const hotelId = req.query.hotel as string;

    const comments = await Comment.find({ hotel: hotelId }).populate('author');
    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.get('/:id', auth, permit('user, admin, director'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const id = req.params.id;

    if (user.role === 'user') {
      const comments = await Comment.find({ _id: id, author: user._id }).populate('author');
      return res.send(comments);
    } else {
      const comments = await Comment.findById(id).populate('author');
      return res.send(comments);
    }
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const newComment = new Comment({
      author: user._id,
      hotel: req.body.hotel,
      text: req.body.text,
      createdAt: new Date(),
    });

    await newComment.save();
    return res.send({ message: { en: 'Comment created successfully', ru: 'Комментарий успешно создан' } });
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

    return res.send({ message: { en: 'Comment updated successfully', ru: 'Комментарий успешно обновлен' } });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

commentsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (user.role === 'user' || user.role === 'hotel') {
      const result = await Comment.deleteOne({ _id: req.params.id, author: user._id });

      if (result.deletedCount) {
        return res.send({ message: { en: 'Comment deleted successfully', ru: 'Комментарий успешно удален' } });
      } else {
        res.status(403).send({ message: 'Forbidden' });
      }
    } else {
      await Comment.deleteOne({ _id: req.params.id });
      return res.send({ message: { en: 'Comment deleted successfully', ru: 'Комментарий успешно удален' } });
    }
  } catch (e) {
    next(e);
  }
});

export default commentsRouter;
