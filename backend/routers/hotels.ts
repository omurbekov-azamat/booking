import express from 'express';
import mongoose from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Hotel from '../models/Hotel';
import { imagesUpload } from '../multer';
import { HotelFact } from '../types';

const hotelsRouter = express.Router();

hotelsRouter.post('/', auth, permit('admin', 'hotel'), imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const hotel = new Hotel({
      userId: user._id,
      name: req.body.name,
      address: req.body.address,
      location: req.body.location ? JSON.parse(req.body.location) : null,
      star: parseFloat(req.body.star),
      image: req.file && req.file.filename,
      nonSmokingRooms: req.body.nonSmokingRooms,
      parking: req.body.parking,
      swimmingPool: req.body.swimmingPool,
      petFriendly: req.body.petFriendly,
      city: req.body.city,
      founding: req.body.founding,
      lowestPrice: req.body.lowestPrice,
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
  const nonSmokingRooms = req.query.nonSmoking as string;
  const swimmingPool = req.query.swimmingPool as string;
  const parking = req.query.parking as string;
  const petFriendly = req.query.petFriendly as string;
  const city = req.query.city as string;
  const queryOwner = req.query.owner as string;
  const queryPage = req.query.page as string;
  const match = req.query.match as string;

  try {
    if (match) {
      const hotelsRes = await Hotel.find({ name: { $regex: new RegExp(match, 'i') } }).limit(10);
      return res.send(hotelsRes);
    }
    if (queryOwner || city) {
      if (queryOwner) {
        const hotelsRes = await Hotel.find({ userId: queryOwner });
        return res.send(hotelsRes);
      }

      const findParams: HotelFact = {};

      if (nonSmokingRooms === 'true') {
        findParams.nonSmokingRooms = true;
      }
      if (parking === 'true') {
        findParams.parking = true;
      }
      if (swimmingPool === 'true') {
        findParams.swimmingPool = true;
      }
      if (petFriendly === 'true') {
        findParams.petFriendly = true;
      }
      if (city) {
        findParams.city = city;
      }

      const hotelResponse = await Hotel.find(findParams);
      return res.send(hotelResponse);
    }
    const hotelsRes = await Hotel.find()
      .skip(queryPage ? parseInt(queryPage) * 18 : 0)
      .limit(18);
    return res.send(hotelsRes);
  } catch {
    return res.sendStatus(500);
  }
});

hotelsRouter.get('/:id', async (req, res) => {
  try {
    const hotelsRes = await Hotel.findById(req.params.id);
    return res.send(hotelsRes);
  } catch {
    return res.sendStatus(500);
  }
});

hotelsRouter.patch('/:id', auth, permit('admin', 'hotel'), imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;
    let findParams;
    if (user.role === 'hotel') {
      findParams = { _id: req.params.id, userId: user._id };
    } else {
      findParams = { _id: req.params.id };
    }
    const hotel = await Hotel.updateOne(findParams, {
      $set: {
        name: req.body.name,
        address: req.body.address,
        location: req.body.location ? req.body.location : null,
        star: req.body.star,
        image: req.file && req.file.filename,
        founding: req.body.founding,
        lowestPrice: req.body.lowestPrice,
      },
    });
    if (hotel.modifiedCount < 1) {
      res.status(404).send({ message: 'Cant find hotel' });
    } else {
      res.send({ message: 'Successfully Updated' });
    }
  } catch {
    return res.sendStatus(500);
  }
});

hotelsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const hotel = await Hotel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isPublished: true,
        },
      },
    );
    if (hotel.modifiedCount < 1) {
      res.status(404).send({ message: 'Cant find hotel' });
    } else {
      res.send({ message: 'Successfully Updated' });
    }
  } catch {
    return res.sendStatus(500);
  }
});

hotelsRouter.delete('/:id', auth, permit('admin', 'hotel'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      if (user && user.role === 'admin') {
        await Hotel.deleteOne({ _id: req.params.id });
        return res.send({ message: 'Deleted successfully' });
      }
      if (user && user.role === 'hotel') {
        await Hotel.deleteOne({ _id: req.params.id, userId: user._id });
        return res.send({ message: 'Deleted successfully' });
      }
    } else {
      res.status(404).send({ message: 'Cant find hotel' });
    }
  } catch (e) {
    return next(e);
  }
});

export default hotelsRouter;
