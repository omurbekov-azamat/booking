import express from 'express';
import mongoose from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Apartment from '../models/Apartment';

const apartmentsRouter = express.Router();

apartmentsRouter.post('/', auth, permit('admin', 'hotel'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const apartment = new Apartment({
      hotelId: user._id,
      roomTypeId: req.body.roomTypeId,
      price: req.body.price,
      images: req.body.images ? JSON.parse(req.body.images) : null,
      description: req.body.description ? req.body.description : null,
    });

    await apartment.save();
    return res.send({ message: 'Created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

apartmentsRouter.get('/', async (req, res, next) => {
  try {
    const queryOwner = req.query.owner as string;
    if (queryOwner) {
      const apartmentsRes = await Apartment.find({ hotelId: queryOwner });
      res.send(apartmentsRes);
    }
    const apartmentsRes = await Apartment.find();
    res.send(apartmentsRes);
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.get('/:id', async (req, res, next) => {
  try {
    const apartmentRes = await Apartment.find({ _id: req.params.id });
    return res.send(apartmentRes);
  } catch (e) {
    return next(e);
  }
});

export default apartmentsRouter;
