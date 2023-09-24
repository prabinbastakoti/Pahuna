const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/auth');
require('express-async-errors');
const middleware = require('./utils/middleware');

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use('/api/auth', authRoute);

app.use(middleware.errorHandler);

module.exports = app;
