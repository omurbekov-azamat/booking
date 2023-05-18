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
      founding: parseFloat(req.body.founding),
      lowestPrice: JSON.parse(req.body.lowestPrice),
      type: req.body.type,
    });

    await hotel.save();
    return res.send({
      message: {
        en: 'Hotel created successfully',
        ru: 'Отель успешно создан',
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

hotelsRouter.get('/getMatchedHotels', auth, permit('director', 'admin'), async (req, res, next) => {
  try {
    const nameMatch = req.query.nameMatch as string;
    if (nameMatch) {
      const matched = await Hotel.find({
        name: { $regex: new RegExp(nameMatch, 'i') },
      }).limit(6);
      return res.send(matched);
    }
  } catch (e) {
    return next(e);
  }
});

hotelsRouter.get('/', async (req, res) => {
  const nonSmokingRooms = req.query.nonSmoking as string;
  const swimmingPool = req.query.swimmingPool as string;
  const parking = req.query.parking as string;
  const petFriendly = req.query.petFriendly as string;
  const star = req.query.star as string;
  const city = req.query.city as string;
  const queryOwner = req.query.owner as string;
  const queryPage = req.query.page as string;
  const match = req.query.match as string;
  const type = req.query.type as string;

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

      if (type) {
        findParams.type = type;
      }
      if (city) {
        findParams.city = city;
      }
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
      if (star !== 'null') {
        findParams.star = star;
      }
      const hotelResponse = await Hotel.find(findParams);
      return res.send(hotelResponse);
    }

    const pageNumber: number = parseInt(queryPage) || 1;

    const hotelsRes = await Hotel.aggregate([
      {
        $facet: {
          premiumHotels: [{ $match: { status: 'premium', isPublished: true } }, { $limit: 18 }],
          businessHotels: [{ $match: { status: 'business', isPublished: true } }, { $limit: 18 }],
          standardHotels: [{ $match: { status: 'standard', isPublished: true } }, { $limit: 18 }],
          totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
      {
        $project: {
          hotels: {
            $concatArrays: [
              '$premiumHotels',
              { $slice: ['$businessHotels', 0, { $subtract: [18, { $size: '$premiumHotels' }] }] },
              {
                $slice: [
                  '$standardHotels',
                  0,
                  { $subtract: [18, { $size: { $concatArrays: ['$premiumHotels', '$businessHotels'] } }] },
                ],
              },
            ],
          },
          totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        },
      },
      { $unwind: '$hotels' },
      { $replaceRoot: { newRoot: '$hotels' } },
      { $skip: (pageNumber - 1) * 18 },
      { $limit: 18 },
    ]);

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
        city: req.body.city,
        address: req.body.address,
        star: parseInt(req.body.star),
        image: req.file && req.file.filename,
        parking: req.body.parking,
        petFriendly: req.body.petFriendly,
        swimmingPool: req.body.swimmingPool,
        nonSmokingRooms: req.body.nonSmokingRooms,
        founding: req.body.founding,
        type: req.body.type,
        lowestPrice: JSON.parse(req.body.lowestPrice),
      },
    });

    if (hotel.modifiedCount < 1) {
      res.status(404).send({ message: 'Cant find hotel' });
    } else {
      res.send({
        message: {
          en: 'Hotel updated successfully',
          ru: 'Отель успешно изменен',
        },
      });
    }
  } catch {
    return res.sendStatus(500);
  }
});

hotelsRouter.patch('/status/:id', auth, permit('director', 'admin'), async (req, res, next) => {
  try {
    const currentHotel = await Hotel.findById(req.params.id);
    if (currentHotel) {
      await Hotel.updateOne({ _id: req.params.id }, { $set: { status: req.body.status } });
      res.send({
        message: {
          en: 'Hotel status successfully',
          ru: 'статус отеля успешно изменен',
        },
      });
    } else {
      res.status(400).send({ message: 'Hotel is not found' });
    }
  } catch (e) {
    return next(e);
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
      res.send({
        message: {
          en: 'Hotel status successfully changed',
          ru: 'статус отеля успешно изменен',
        },
      });
    }
  } catch {
    return res.sendStatus(500);
  }
});

hotelsRouter.get('/get/favorites', auth, permit('user'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const favoriteHotelIds = user.favorites;
    const hotels = await Hotel.find({ _id: { $in: favoriteHotelIds }, isPublished: true });
    if (!hotels) {
      return res.send({ message: 'You do not have favorites hotels' });
    }
    return res.json(hotels);
  } catch (e) {
    return next(e);
  }
});

hotelsRouter.get('/get/unPublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ isPublished: false });
    return res.send(hotels);
  } catch (e) {
    next(e);
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
        return res.send({
          message: {
            en: 'Hotel deleted successfully',
            ru: 'Отель успешно удалён',
          },
        });
      }
    } else {
      res.status(404).send({ message: 'Cant find hotel' });
    }
  } catch (e) {
    return next(e);
  }
});

hotelsRouter.get('/random/recommended', async (req, res, next) => {
  try {
    const hotels = await Hotel.aggregate([{ $match: { status: 'premium' } }, { $sample: { size: 6 } }]);
    return res.send(hotels);
  } catch (e) {
    next(e);
  }
});

export default hotelsRouter;
