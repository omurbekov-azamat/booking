import express from 'express';
import mongoose from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Hotel from '../models/Hotel';

const hotelsRouter = express.Router();

hotelsRouter.post('/', auth, permit('admin', 'hotel'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const hotel = new Hotel({
      userId: user._id,
      name: req.body.name,
      address: req.body.address,
      location: req.body.location ? req.body.location : null,
      star: req.body.star,
    });

    await hotel.save();
    return res.send({ message: 'Created successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

hotelsRouter.get('/', async (req, res) => {
  try {
    const queryOwner = req.query.owner as string;
    if (queryOwner) {
      const hotelsRes = await Hotel.find({ userId: queryOwner });
      res.send(hotelsRes);
    }
    const hotelsRes = await Hotel.find();
    res.send(hotelsRes);
  } catch {
    return res.sendStatus(500);
  }
});

export default hotelsRouter;
