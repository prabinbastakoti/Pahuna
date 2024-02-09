require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const uploadRoute = require('./routes/upload');
const placeRoute = require('./routes/place');
const bookRoute = require('./routes/book');
const reviewRoute = require('./routes/review');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.URI)
  .then(() => {
    logger.info('Connected to mongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB Disconnected');
  });

// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://pahuna-client.onrender.com/'],
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
//   })
// );

app.use((req, res, next) => {
  const corsWhitelist = [
    'http://localhost:3000',
    'https://pahuna-client.onrender.com',
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
  }

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
app.use('/api/review', reviewRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
