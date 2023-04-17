import mongoose from 'mongoose';
import * as crypto from 'crypto';
import config from './config';
import User from './models/User';
import RoomType from './models/RoomType';
import Hotel from './models/Hotel';
import Apartment from './models/Apartment';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('roomtypes');
    await db.dropCollection('hotels');
    await db.dropCollection('apartments');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, user, hotel, director] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Adminich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'user@gmail.com',
      firstName: 'User',
      lastName: 'Userovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 9999999',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'hotel@gmail.com',
      firstName: 'Hotel',
      lastName: 'Hotelovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'hotel',
      phoneNumber: '0555 444444',
      status: 'super',
      cashback: '0',
    },
    {
      email: 'director@gmail.com',
      firstName: 'Director',
      lastName: 'Directorovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'director',
      phoneNumber: '0555 888888',
      status: 'super',
      cashback: '0',
    },
  );

  const [singleRoom, doubleRoom, tripleRoom] = await RoomType.create(
    {
      name: 'single room',
    },
    {
      name: 'double room',
    },
    {
      name: 'triple room',
    },
  );

  const [plaza, hyatt, lulu] = await Hotel.create(
    {
      userId: hotel._id,
      name: 'Plaza Hotel Bishkek',
      address: 'Улица Тоголок Молдо 52, 720044 Бишкек, Кыргызстан',
      location: {
        latitude: 100,
        longitude: 100,
      },
      star: 5,
      isPublished: false,
      image: 'fixtures/plaza.jpg',
    },
    {
      userId: hotel._id,
      name: 'Hyatt Regency Bishkek',
      address: 'Abdrahmanov Street 191, 720011 Бишкек, Киргизия',
      location: {
        latitude: 50,
        longitude: 50,
      },
      star: 4,
      isPublished: false,
      image: 'fixtures/hyatt.jpg',
    },
    {
      userId: hotel._id,
      name: 'Hotel Lulu',
      address: 'Baytik Baatyr str, 70 , 720005 Бишкек, Киргизия',
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 3,
      isPublished: false,
      image: 'fixtures/lulu.jpg',
    },
  );

  await Apartment.create(
    {
      hotelId: plaza._id,
      roomTypeId: doubleRoom._id,
      price: {
        from: 100,
        till: 150,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: 'Awesome Plaza Apartment 1',
    },
    {
      hotelId: plaza._id,
      roomTypeId: tripleRoom._id,
      price: {
        from: 150,
        till: 200,
      },
      images: ['fixtures/plaza21.jpg', 'fixtures/plaza22.jpg'],
      description: 'Awesome Plaza Apartment 2',
    },
    {
      hotelId: hyatt._id,
      roomTypeId: singleRoom._id,
      price: {
        from: 200,
        till: 250,
      },
      images: ['fixtures/hyatt11.jpg', 'fixtures/hyatt12.jpg'],
      description: 'Awesome Hyatt Apartment 1',
    },
    {
      hotelId: hyatt._id,
      roomTypeId: tripleRoom._id,
      price: {
        from: 250,
        till: 300,
      },
      images: ['fixtures/hyatt21.jpg', 'fixtures/hyatt22.jpg'],
      description: 'Awesome Hyatt Apartment 2',
    },
    {
      hotelId: lulu._id,
      roomTypeId: doubleRoom._id,
      price: {
        from: 250,
        till: 300,
      },
      images: ['fixtures/lulu11.jpg', 'fixtures/lulu12.jpg'],
      description: 'Awesome Lulu Apartment 1',
    },
    {
      hotelId: lulu._id,
      roomTypeId: tripleRoom._id,
      price: {
        from: 250,
        till: 300,
      },
      images: ['fixtures/lulu11.jpg', 'fixtures/lulu12.jpg'],
      description: 'Awesome Lulu Apartment 2',
    },
  );

  await db.close();
};

run().catch(console.error);
