import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Hotel from '../models/Hotel';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import config from '../config';

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

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

usersRouter.post('/session/token', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    await user.save();
    return res.send({ message: 're-authorization was successful', user });
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

usersRouter.get('/getMatched', auth, permit('director'), async (req, res, next) => {
  try {
    const lastNameMatch = req.query.nameMatch as string;
    const emailMatch = req.query.emailMatch as string;
    if (lastNameMatch) {
      const matchedUsers = await User.find({
        lastName: { $regex: new RegExp(lastNameMatch, 'i') },
        role: 'user',
      }).limit(20);
      return res.send(matchedUsers);
    }
    if (emailMatch) {
      const matchedUsers = await User.find({
        email: { $regex: new RegExp(emailMatch, 'i') },
        role: 'user',
      }).limit(20);
      return res.send(matchedUsers);
    }
  } catch (e) {
    return next(e);
  }
});

usersRouter.patch('/status/:id', auth, permit('director'), async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (currentUser) {
      await User.updateOne({ _id: req.params.id }, { $set: { status: req.body.status } });
      res.send({ message: 'status changed' });
    } else {
      res.status(400).send({ message: 'User is not found' });
    }
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
        await user.save();
        return res.send({
          message: {
            en: foundHotel.name + ' added to favorites successfully',
            ru: foundHotel.name + ' успешно добавлен в избраное',
          },
        });
      }
    }
    if (deleteHotelId) {
      const foundHotel = await Hotel.findById(deleteHotelId);
      if (!foundHotel) {
        return res.send({ error: 'Hotel is not found' });
      }
      if (!user.favorites.includes(deleteHotelId)) {
        return res.send({ message: 'You dont have this hotel in the favorites' });
      }
      user.favorites = user.favorites.filter((favHotel) => favHotel.toString() !== deleteHotelId);
      await user.save();
      return res.send({
        message: {
          en: foundHotel.name + ' removed from favorites successfully',
          ru: foundHotel.name + ' успешно уделён из избраное',
        },
      });
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

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential.cred,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const firstName = payload['given_name'];
    const lastName = payload['family_name'];
    const phoneNumber = req.body.credential.phone;
    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOneAndUpdate({ googleId: id }, { phoneNumber: phoneNumber }, { new: true });

    if (!user) {
      user = new User({
        email: email,
        lastName: lastName,
        firstName: firstName,
        password: crypto.randomUUID(),
        phoneNumber: phoneNumber,
        googleId: id,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({
      message: 'Login with Google successful!',
      user,
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/getVerify', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.mail,
        pass: 'qlfhiaqbgitxqlaw',
      },
    });
    const mailOptions = {
      from: config.mail,
      to: user.email,
      subject: 'Email Verification',
      text: `Please click the following link to verify your email: ${config.site}/verify/${user.verificationToken}`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        return res.send({
          message: {
            en: 'Mail sent. check ' + user.email,
            ru: 'письмо отправлено. проверьте ' + user.email,
          },
        });
      }
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/verify/:token', auth, async (req, res) => {
  const token = req.params.token;
  const reqUser = (req as RequestWithUser).user;
  const user = await User.findOne({ verificationToken: token, _id: reqUser.id });

  if (!user) {
    return res.status(404).json({ message: 'Invalid verification token' });
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  return res.send({
    message: {
      en: 'successfully verified',
      ru: 'успешно верифицированно ',
    },
  });
});

usersRouter.patch('/password', auth, permit('user'), async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const user = (req as RequestWithUser).user;
    user.password = newPassword;
    await user.save();
    return res.send({
      message: {
        en: 'Password changed successfully',
        ru: 'Пароль успешно изменен ',
      },
    });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
