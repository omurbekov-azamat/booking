import express from 'express';
import mongoose from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Order from '../models/Order';

const ordersRouter = express.Router();

ordersRouter.post('/', auth, permit('admin', 'user', 'director'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const order = new Order({
      userId: user._id,
      apartmentId: req.body.apartmentId,
      createdAt: new Date().toISOString(),
      comment: req.body.comment,
      dateArrival: req.body.dateArrival,
      dateDeparture: req.body.dateDeparture,
    });

    await order.save();
    return res.send({ message: 'Created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default ordersRouter;
