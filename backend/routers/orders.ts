import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Order from '../models/Order';
import { IApartment } from '../types';

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
      personalTranslator: req.body.personalTranslator,
      meetingAirport: req.body.meetingAirport,
      tourManagement: req.body.tourManagement,
      eventManagement: req.body.eventManagement,
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
        const adminOrders = await Order.find({ adminId: req.query.admin })
          .populate('userId', '-token')
          .populate('adminId', '-token')
          .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
        return res.send(adminOrders);
      } else {
        const openOrders = await Order.find({ status: 'open', adminId: null })
          .populate('userId', '-token')
          .populate('adminId', '-token')
          .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
        return res.send(openOrders);
      }
    }
    if (user.role === 'director') {
      if (req.query.admin) {
        const adminClosedOrders = await Order.find({ adminId: req.query.admin, status: 'closed' })
          .populate('userId', '-token')
          .populate('adminId', '-token')
          .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
        return res.send(adminClosedOrders);
      } else {
        const closedOrders = await Order.find({ status: 'closed' })
          .populate('userId', '-token')
          .populate('adminId', '-token')
          .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
        return res.send(closedOrders);
      }
    }
    if (user.role === 'user') {
      const yourOrders = await Order.find({ userId: user.id })
        .populate('userId', '-token')
        .populate('adminId', '-token')
        .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
      return res.send(yourOrders);
    }
  } catch (e) {
    return next(e);
  }
});

ordersRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const updatedFields = { ...req.body };
    updatedFields.adminId = user._id;

    const order: HydratedDocument<IApartment> | null = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedFields },
      { new: true },
    );

    if (!order) {
      return res.status(404).send({ message: 'Cant find order' });
    }

    return res.status(200).send({ message: 'Order updated successfully' });
  } catch (e) {
    return next(e);
  }
});

ordersRouter.delete('/:id', auth, permit('admin', 'director', 'user'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const order = await Order.findById(req.params.id);
  try {
    if (order) {
      if (user.role === 'admin' || user.role === 'director') {
        await Order.deleteOne({ _id: req.params.id });
        return res.send({ message: 'Deleted successfully' });
      }

      if (user.role === 'user') {
        if (order.userId.toString() === user._id.toString()) {
          await Order.deleteOne({ _id: req.params.id, userId: user._id });
          return res.send({ message: 'Deleted successfully' });
        } else {
          return res.send({ message: 'You cant delete' });
        }
      }
    } else {
      return res.status(404).send({ message: 'Cant find order' });
    }
  } catch (e) {
    return next(e);
  }
});
export default ordersRouter;
