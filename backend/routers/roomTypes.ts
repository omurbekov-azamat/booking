import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth from '../middleware/auth';
import RoomType from '../models/RoomType';
import permit from '../middleware/permit';
import { promises as fs } from 'fs';
import { IRoomType } from '../types';

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

roomTypesRouter.get('/', async (req, res, next) => {
  try {
    const room = await RoomType.find();
    return res.send(room);
  } catch (e) {
    return next(e);
  }
});

roomTypesRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const room: HydratedDocument<IRoomType> | null = await RoomType.findById(req.params.id);

    if (!room) {
      return res.sendStatus(404);
    }

    room.name = req.body.name;

    await room.save();
    return res.send(room);
  } catch (e) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

roomTypesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const room = await RoomType.findById(req.params.id);

    if (room) {
      await RoomType.deleteOne({ _id: req.params.id });
      return res.send({ message: 'Deleted successfully' });
    }
  } catch (e) {
    return next(e);
  }
});

export default roomTypesRouter;
