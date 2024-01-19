require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const uploadRoute = require('./routes/upload');
const placeRoute = require('./routes/place');
const bookRoute = require('./routes/book');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.URI)
  .then(() => {
    logger.info('Connected to mongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB Disconnected');
  });

app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://pahuna-client.onrender.com'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Private-Network', true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader('Access-Control-Max-Age', 7200);

  next();
});

app.use(cookieParser());
app.use(express.json());
app.use('/api/uploads', express.static(__dirname + '/uploads'));
app.use(express.static('dist'));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/place', placeRoute);
app.use('/api/bookplace', bookRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
