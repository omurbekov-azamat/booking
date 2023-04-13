import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import RoomType from '../models/RoomType';
import permit from '../middleware/permit';

const roomTypesRouter = express.Router();

roomTypesRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const room = await RoomType.create({
      name: req.body.name,
    });
    return res.send(room);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});
