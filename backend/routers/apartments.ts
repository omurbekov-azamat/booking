import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Apartment from '../models/Apartment';
import { imagesUpload } from '../multer';
import { IApartment, IHotel } from '../types';
import Hotel from '../models/Hotel';

const apartmentsRouter = express.Router();

apartmentsRouter.post('/', auth, permit('admin', 'hotel'), imagesUpload.array('images'), async (req, res, next) => {
  try {
    const apartment = new Apartment({
      hotelId: req.body.hotelId,
      roomTypeId: req.body.roomTypeId,
      price: JSON.parse(req.body.price),
      images: req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : null,
      description: JSON.parse(req.body.description),
      AC: req.body.AC,
      balcony: req.body.balcony,
      bath: req.body.bath,
      petFriendly: req.body.petFriendly,
      food: req.body.food,
      towel: req.body.towel,
      wifi: req.body.wifi,
      place: parseFloat(req.body.place),
      tv: req.body.tv,
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
      const apartmentsRes = await Apartment.find({ hotelId: queryOwner }).populate('roomTypeId');
      return res.send(apartmentsRes);
    }
    const apartmentsRes = await Apartment.find().populate('roomTypeId');
    return res.send(apartmentsRes);
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.get('/:id', async (req, res, next) => {
  try {
    const apartmentRes = await Apartment.findById(req.params.id).populate('roomTypeId');
    return res.send(apartmentRes);
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.patch('/:id', auth, permit('admin', 'hotel'), imagesUpload.array('images'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const updatedFields = { ...req.body };

    const apartment: HydratedDocument<IApartment> | null = await Apartment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedFields },
      { new: true },
    );

    if (!apartment) {
      return res.status(404).send({ message: 'Not found apartment!' });
    }

    if (req.files) {
      apartment.images = apartment.images
        ? apartment.images.concat((req.files as Express.Multer.File[]).map((file) => file.filename))
        : (req.files as Express.Multer.File[]).map((file) => file.filename);
      await apartment.save();
    }

    const hotel: HydratedDocument<IHotel> | null = await Hotel.findById(apartment.hotelId);

    if (!hotel) {
      return res.status(404).send({ message: 'Not found!' });
    }

    if (user.role === 'admin' || hotel.userId.toString() === user._id.toString()) {
      res.send({ message: 'Changed successfully', apartment });
    } else {
      return res.status(403).send({ message: 'You do not have permission!' });
    }
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.delete('/:id', auth, permit('admin', 'hotel'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res.status(404).send({ message: 'Not found apartment!' });
    }

    const hotel: HydratedDocument<IHotel> | null = await Hotel.findById(apartment.hotelId);

    if (!hotel) {
      return res.status(404).send({ message: 'Not found!' });
    }

    if (user.role === 'admin' || hotel.userId.toString() === user._id.toString()) {
      await Apartment.deleteOne({ _id: req.params.id });
      res.send({ message: 'Deleted successfully' });
    } else {
      return res.status(403).send({ message: 'You do not have permission!' });
    }
  } catch (e) {
    return next(e);
  }
});

apartmentsRouter.delete('/:id/images/:index', auth, permit('admin', 'hotel'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res.status(404).send({ message: 'Not found apartment!' });
    }

    const hotel: HydratedDocument<IHotel> | null = await Hotel.findById(apartment.hotelId);

    if (!hotel) {
      return res.status(404).send({ message: 'Not found hotel!' });
    }

    if (user.role === 'admin' || hotel.userId.toString() === user._id.toString()) {
      const index = parseInt(req.params.index);

      if (apartment.images && index >= 0 && index < apartment.images.length) {
        apartment.images.splice(index, 1);
        await apartment.save();
        res.send({ message: 'Deleted successfully' });
      } else {
        return res.status(404).send({ message: 'Not found image!' });
      }
    } else {
      return res.status(403).send({ message: 'You do not have permission!' });
    }
  } catch (e) {
    return next(e);
  }
});

export default apartmentsRouter;
