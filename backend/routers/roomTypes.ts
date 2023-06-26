import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth from '../middleware/auth';
import RoomType from '../models/RoomType';
import permit from '../middleware/permit';
import { IRoomType } from '../types';

const roomTypesRouter = express.Router();

roomTypesRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const room = await RoomType.create({
      name: {
        ru: req.body.ru,
        en: req.body.en,
      },
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

roomTypesRouter.get('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const room = await RoomType.findById(req.params.id);
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

    room.name.en = req.body.en;
    room.name.ru = req.body.ru;

    await room.save();
    return res.send({
      message: {
        en: 'Room type updated successfully',
        ru: 'Тип комнаты успешно обновлен',
      },
    });
  } catch (e) {
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
      return res.send({
        message: {
          en: 'Room type deleted successfully',
          ru: 'Тип комнаты успешно удален',
        },
      });
    }
  } catch (e) {
    return next(e);
  }
});

export default roomTypesRouter;
