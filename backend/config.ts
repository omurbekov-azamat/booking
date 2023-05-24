import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/booking',
  mail: 'esdpjs17@gmail.com',
  site: 'http://localhost:8000',
};

export default config;
