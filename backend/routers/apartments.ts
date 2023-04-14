import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';
import Apartment from '../models/Apartment';
import { imagesUpload } from '../multer';
import { ApartmentWithId } from '../types';
import { promises as fs } from 'fs';

const apartmentsRouter = express.Router();

apartmentsRouter.post('/', auth, permit('admin', 'hotel'), imagesUpload.array('images'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const apartment = new Apartment({
      hotelId: user._id,
      roomTypeId: req.body.roomTypeId,
      price: req.body.price,
      images: req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : null,
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

apartmentsRouter.patch('/:id', auth, permit('admin', 'hotel'), imagesUpload.array('images'), async (req, res, next) => {
  try {
    const apartment: HydratedDocument<ApartmentWithId> | null = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res.status(404).send({ message: 'Not found apartment!' });
    }

    apartment.roomType = req.body.roomType;
    apartment.price = req.body.price;

    if (req.files) {
      apartment.images = (req.files as Express.Multer.File[]).map((file) => file.path);
    } else {
      apartment.images = null;
    }

    apartment.info = req.body.info && null;

    await apartment.save();

    res.send({ message: 'Changed successfully' });
  } catch (e) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

apartmentsRouter.delete('/:id', auth, permit('admin', 'hotel'), async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res.status(404).send({ message: 'Not found apartment!' });
    }

    await Apartment.deleteOne({ _id: req.params.id });
    res.send({ message: 'Deleted successfully' });
  } catch (e) {
    return next(e);
  }
});

export default apartmentsRouter;
