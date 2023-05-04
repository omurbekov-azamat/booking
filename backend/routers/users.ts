import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Hotel from '../models/Hotel';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'Registered successfully!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ error: 'Email or password incorrect' });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: 'Email or password incorrect' });
  }

  try {
    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/admins', auth, permit('director'), async (req, res, next) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-token');
    return res.send(admins);
  } catch (e) {
    return next(e);
  }
});

usersRouter.patch('/toggleAddHotelToFavorites', auth, permit('user'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const addHotelId = req.body.addHotel;
  const deleteHotelId = req.body.deleteHotel;
  try {
    if (addHotelId) {
      const foundHotel = await Hotel.findById(addHotelId);
      if (!foundHotel) {
        return res.send({ error: 'Hotel is not found' });
      }

      if (user.favorites.includes(addHotelId)) {
        return res.send({ message: 'The hotel is already in the favorites' });
      } else {
        user.favorites.push(addHotelId);
        user.save();
        return res.send({ message: 'Hotel added to favorites successfully' });
      }
    }
    if (deleteHotelId) {
      if (!user.favorites.includes(deleteHotelId)) {
        return res.send({ message: 'You dont have this hotel in the favorites' });
      }
      user.favorites = user.favorites.filter((favHotel) => favHotel.toString() !== deleteHotelId);
      await user.save();
      return res.send({ message: 'you have successfully removed the hotel from your favorites' });
    }
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'Success' };

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
