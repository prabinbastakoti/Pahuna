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
