import path from 'path';
import * as dotenv from 'dotenv';

const envFile = '.env';

dotenv.config({ path: envFile });

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/booking',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '',
  },
  mail: 'hotelsbookingkg@gmail.com',
  site: process.env.WEBSITE_ADDRESS ? process.env.WEBSITE_ADDRESS : 'http://37.139.3.4',
};

export default config;
