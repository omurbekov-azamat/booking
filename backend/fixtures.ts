import mongoose from 'mongoose';
import * as crypto from 'crypto';
import config from './config';
import User from './models/User';
import RoomType from './models/RoomType';
import Hotel from './models/Hotel';
import Apartment from './models/Apartment';
import Order from './models/Order';
import Comment from './models/Comments';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('roomtypes');
    await db.dropCollection('hotels');
    await db.dropCollection('apartments');
    await db.dropCollection('orders');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, admin2, user, hotel, director, user2] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Adminich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
      status: 'royal',
      cashback: '10',
      isVerified: true,
    },
    {
      email: 'admin2@gmail.com',
      firstName: 'Admin2',
      lastName: 'Adminich2',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
      status: 'vip',
      cashback: '20',
      isVerified: true,
    },
    {
      email: 'user@gmail.com',
      firstName: 'User',
      lastName: 'Userovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 9999999',
      status: 'vip',
      cashback: '30',
      isVerified: true,
    },
    {
      email: 'hotel@gmail.com',
      firstName: 'Hotel',
      lastName: 'Hotelovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'hotel',
      phoneNumber: '0555 444444',
      status: 'royal',
      cashback: '40',
      isVerified: true,
    },
    {
      email: 'director@gmail.com',
      firstName: 'Director',
      lastName: 'Directorovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'director',
      phoneNumber: '0555 888888',
      status: 'vip',
      cashback: '0',
      isVerified: true,
    },
    {
      email: 'user2@gmail.com',
      firstName: 'User2',
      lastName: 'Userovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 9999998',
      status: 'royal',
      cashback: '220',
      isVerified: true,
    },
    {
      email: 'hotel2@gmail.com',
      firstName: 'Hotel2',
      lastName: 'Hotelovich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'hotel',
      phoneNumber: '0555 888888',
      status: 'vip',
      cashback: '370',
      isVerified: true,
    },
  );

  const [singleRoom, doubleRoom, tripleRoom] = await RoomType.create(
    {
      name: {
        ru: 'однокомнатный номер',
        en: 'single room',
      },
    },
    {
      name: {
        ru: 'двухкомнатный номер',
        en: 'double room',
      },
    },
    {
      name: {
        ru: 'трехкомнатный номер',
        en: 'triple room',
      },
    },
  );

  const [
    dragon,
    demar,
    sara,
    discovery,
    salut,
    aurum,
    asia,
    navat,
    madison,
    silkroad,
    veve,
    palace,
    central,
    plaza,
    hyatt,
    lulu,
    dostuk,
    jannat,
  ] = await Hotel.create(
    {
      userId: hotel._id,
      name: 'Golden Dragon',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/goldenDragon.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'De`Mar Hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/deMar.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Sara Boutique Hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/Sara.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Discovery Hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/hyatt.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Salut Hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/salut.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
      type: 'pension',
    },
    {
      userId: hotel._id,
      name: 'Aurum hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/aurum.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
      type: 'guestHouse',
    },
    {
      userId: hotel._id,
      name: 'Asia Hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/asia.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Navat Hotel',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/navat.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Madison Ave Hotel Bishkek',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/madison.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Silk Road Lodge',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/silk.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Veve Hotel Bishkek',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/silk.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Palace Resident Bishkek',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 300,
        longitude: 800,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/resident.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 5000,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Central Park Resident',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 200,
        longitude: 500,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/central.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 1000,
        dollar: 12,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Plaza Hotel Bishkek',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 100,
        longitude: 100,
      },
      star: 5,
      isPublished: true,
      image: 'fixtures/plaza.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2000,
      lowestPrice: {
        som: 1000,
        dollar: 12,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Hyatt Regency',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 50,
        longitude: 50,
      },
      star: 4,
      isPublished: true,
      image: 'fixtures/hyatt.jpg',
      nonSmokingRooms: true,
      parking: true,
      swimmingPool: false,
      petFriendly: false,
      city: 'issykKul',
      founding: 2001,
      lowestPrice: {
        som: 1100,
        dollar: 13,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'premium',
    },
    {
      userId: hotel._id,
      name: 'Hotel Lulu',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 3,
      isPublished: false,
      image: 'fixtures/lulu.jpg',
      nonSmokingRooms: true,
      parking: true,
      swimmingPool: true,
      petFriendly: true,
      city: 'osh',
      founding: 2003,
      lowestPrice: {
        som: 1200,
        dollar: 14,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Dostuk',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 2,
      isPublished: true,
      image: 'fixtures/dostuk.jpg',
      nonSmokingRooms: true,
      parking: true,
      swimmingPool: false,
      petFriendly: true,
      city: 'bishkek',
      founding: 2005,
      lowestPrice: {
        som: 1400,
        dollar: 15,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'business',
    },
    {
      userId: hotel._id,
      name: 'Jannat Regency',
      address: {
        adrRu: 'улица Элебаева 60',
        adrEn: 'Elebaev Street 60',
      },
      location: {
        latitude: 150,
        longitude: 150,
      },
      star: 2,
      isPublished: true,
      image: 'fixtures/janat.jpg',
      nonSmokingRooms: false,
      parking: true,
      swimmingPool: true,
      petFriendly: false,
      city: 'bishkek',
      founding: 2008,
      lowestPrice: {
        som: 1700,
        dollar: 16,
      },
      description: {
        ru: 'Отель - идеальное место для вашего отдыха. У нас вы найдете комфортабельные номера, великолепный сервис. Насладитесь вкусным завтраком, отдохните у нашего бассейна и наслаждайтесь уютной атмосферой нашего ресторана. Наш дружелюбный персонал всегда готов сделать ваше пребывание незабываемым.',
        en: 'The hotel is the perfect place for your holiday. Here you will find comfortable rooms, excellent service. Enjoy a delicious breakfast, relax by our pool and enjoy the cozy atmosphere of our restaurant. Our friendly staff is always ready to make your stay unforgettable.',
      },
      status: 'standard',
    },
  );

  const [
    dragonApart1,
    dragonApart2,
    dragonApart3,
    demarApart1,
    demarApart2,
    demarApart3,
    saraApart1,
    saraApart2,
    saraApart3,
    discoveryApart1,
    discoveryApart2,
    discoveryApart3,
    salutApart1,
    salutApart2,
    salutApart3,
    aurumApart1,
    aurumApart2,
    aurumApart3,
    asiaApart1,
    asiaApart2,
    asiaApart3,
    navatApart1,
    navatApart2,
    navatApart3,
    madisonApart1,
    madisonApart2,
    madisonApart3,
    silkroadApart1,
    silkroadApart2,
    silkroadApart3,
    veveApart1,
    veveApart2,
    veveApart3,
    palaceApart1,
    palaceApart2,
    palaceApart3,
    centralApart1,
    centralApart2,
    centralApart3,
    plazaApart1,
    plazaApart2,
    plazaApart3,
    hyattApart1,
    hyattApart2,
    hyattApart3,
    luluApart1,
    luluApart2,
    luluApart3,
    dostukApart1,
    dostukApart2,
    dostukApart3,
    jannatApart1,
    jannatApart2,
    jannatApart3,
  ] = await Apartment.create(
    {
      hotelId: dragon._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: dragon._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: dragon._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: demar._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: demar._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: demar._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: sara._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: sara._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: sara._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: discovery._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: discovery._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: discovery._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: salut._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: salut._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: salut._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: aurum._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: aurum._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: aurum._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: asia._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: asia._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: asia._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: navat._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: navat._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: navat._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: madison._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: madison._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: madison._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: silkroad._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: silkroad._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: silkroad._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: veve._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: veve._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: veve._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: palace._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: palace._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: palace._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: central._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: central._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: central._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: plaza._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: plaza._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: plaza._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: hyatt._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: hyatt._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: hyatt._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: lulu._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: lulu._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: lulu._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: dostuk._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: dostuk._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: dostuk._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
    {
      hotelId: jannat._id,
      roomTypeId: singleRoom._id,
      price: {
        usd: 20,
        kgs: 2000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 1',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: false,
      bath: true,
      petFriendly: false,
      food: true,
      place: 30,
      tv: false,
      towel: true,
      wifi: false,
    },
    {
      hotelId: jannat._id,
      roomTypeId: doubleRoom._id,
      price: {
        usd: 30,
        kgs: 3000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 2',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: false,
      food: true,
      place: 40,
      tv: true,
      towel: true,
      wifi: false,
    },
    {
      hotelId: jannat._id,
      roomTypeId: tripleRoom._id,
      price: {
        usd: 40,
        kgs: 4000,
      },
      images: ['fixtures/plaza11.jpg', 'fixtures/plaza12.jpg'],
      description: {
        ru: 'Классные апартаменты 3',
        en:
          '   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci amet aspernatur eaque eos est eum\n' +
          '        nesciunt optio qui repellendus temporibus, tenetur. Adipisci aliquam assumenda atque, delectus deleniti deserunt\n' +
          '        doloremque dolores est et eum eveniet fugiat impedit in magni maiores maxime minima nihil odit officia pariatur\n' +
          '        placeat quisquam sed sit ullam unde vel, veritatis voluptatum? Aliquam asperiores facere, ipsa ipsam iusto\n' +
          '        officiis quasi repellat? Architecto eveniet, id itaque maxime perferendis porro quisquam sed sequi similique\n' +
          '        suscipit. Atque autem ipsam minus quam quia rerum voluptatibus! Alias consequatur consequuntur distinctio\n' +
          '        eveniet fuga magnam sapiente veritatis voluptas. Eaque id itaque, molestias odit porro quasi unde. Alias aliquam\n' +
          '        animi architecto aspernatur aut beatae blanditiis corporis, culpa dolor dolore dolorem eligendi eos est et\n' +
          '        exercitationem expedita inventore ipsum libero magnam nam neque nesciunt nobis nostrum numquam obcaecati officia\n' +
          '        optio praesentium, quasi qui quod reprehenderit sequi similique sit ut vel veniam vero. Ad aspernatur\n' +
          '        consectetur corporis debitis delectus dicta dolore doloremque eius eveniet ex expedita facilis fuga fugit harum,\n' +
          '        in incidunt ipsa ipsum labore laudantium minus mollitia nemo nihil non quibusdam ratione recusandae repellat\n' +
          '        saepe soluta sunt tempora unde veniam voluptatem voluptates. Ab omnis, quia! Aperiam cupiditate delectus et non\n' +
          '        reiciendis rerum saepe sapiente tempora, voluptatum.',
      },
      AC: true,
      balcony: true,
      bath: true,
      petFriendly: true,
      food: true,
      place: 50,
      tv: true,
      towel: true,
      wifi: true,
    },
  );

  await Order.create(
    {
      userId: user._id,
      adminId: admin._id,
      status: 'closed',
      apartmentId: demarApart1._id,
      createdAt: Date.now(),
      dateArrival: '28.04.2023',
      dateDeparture: '29.04.2023',
      personalTranslator: true,
      meetingAirport: false,
      tourManagement: true,
      eventManagement: false,
      amountOfDays: 1,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
    {
      userId: user._id,
      adminId: admin._id,
      status: 'closed',
      apartmentId: demarApart2._id,
      createdAt: Date.now(),
      dateArrival: '28.04.2023',
      dateDeparture: '29.04.2023',
      personalTranslator: false,
      meetingAirport: true,
      tourManagement: true,
      eventManagement: true,
      amountOfDays: 1,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
    {
      userId: user._id,
      adminId: admin2._id,
      status: 'closed',
      apartmentId: demarApart3._id,
      createdAt: Date.now(),
      dateArrival: '28.04.2023',
      dateDeparture: '30.04.2023',
      personalTranslator: false,
      meetingAirport: true,
      tourManagement: true,
      eventManagement: true,
      amountOfDays: 2,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
    {
      userId: user._id,
      apartmentId: dragonApart1._id,
      createdAt: Date.now(),
      dateArrival: '30.04.2023',
      dateDeparture: '02.05.2023',
      personalTranslator: true,
      meetingAirport: false,
      tourManagement: true,
      eventManagement: true,
      amountOfDays: 1,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
    {
      userId: user2._id,
      apartmentId: dragonApart2._id,
      createdAt: Date.now(),
      dateArrival: '30.04.2023',
      dateDeparture: '01.05.2023',
      personalTranslator: true,
      meetingAirport: false,
      tourManagement: true,
      eventManagement: true,
      amountOfDays: 1,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
    {
      userId: user2._id,
      apartmentId: dragonApart3._id,
      createdAt: Date.now(),
      dateArrival: '01.05.2023',
      dateDeparture: '02.05.2023',
      personalTranslator: true,
      meetingAirport: false,
      tourManagement: true,
      eventManagement: true,
      amountOfDays: 1,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
    {
      userId: user2._id,
      apartmentId: demarApart3._id,
      createdAt: Date.now(),
      dateArrival: '01.05.2023',
      dateDeparture: '04.05.2023',
      personalTranslator: true,
      meetingAirport: false,
      tourManagement: true,
      eventManagement: true,
      amountOfDays: 3,
      totalPrice: {
        usd: 10,
        kgs: 200,
      },
    },
  );

  await Comment.create(
    {
      author: user._id,
      hotel: dragon._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: dragon._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: demar._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: demar._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: sara._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: sara._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: discovery._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: discovery._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: salut._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: salut._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: aurum._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: aurum._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: asia._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: asia._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: navat._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: navat._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: madison._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: madison._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: silkroad._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: silkroad._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: veve._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: veve._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: palace._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: palace._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: central._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: central._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: plaza._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: plaza._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: hyatt._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: hyatt._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: lulu._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: lulu._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: dostuk._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: dostuk._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
    {
      author: user._id,
      hotel: jannat._id,
      text: 'Some good comment 1',
      createdAt: new Date(),
    },
    {
      author: user2._id,
      hotel: jannat._id,
      text: 'Some good comment 2',
      createdAt: new Date(),
    },
  );

  await db.close();
};

run().catch(console.error);
