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
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

ordersRouter.get('/', auth, permit('admin', 'director', 'user'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    if (user.role === 'admin') {
      if (req.query.admin) {
        const adminOrders = await Order.find({ adminId: req.query.admin }).populate('userId', '-token');
        return res.send({ message: 'Admin orders', adminOrders });
      } else {
        const openOrders = await Order.find({ status: 'open' }).populate('userId', '-token');
        return res.send({ message: 'Open orders', openOrders });
      }
    }
    if (user.role === 'director') {
      const closedOrders = await Order.find({ status: 'closed' }).populate('adminId', '-token');
      return res.send({ message: 'Closed order', closedOrders });
    }
    if (user.role === 'user') {
      const yourOrders = await Order.find({ userId: user.id });
      return res.send({ message: 'Your orders', yourOrders });
    }
  } catch (e) {
    return next(e);
  }
});

export default ordersRouter;
