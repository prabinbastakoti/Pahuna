require('dotenv').config();

const PORT = process.env.PORT;

const URI = process.env.MONGODB_URI;

const SECRET = process.env.SECRET;

const ORIGIN = process.env.ORIGIN;

module.exports = { PORT, URI, SECRET, ORIGIN };
