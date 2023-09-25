const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const getUser = async (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) return res.status(401).json('You are not authenticated!');

  jwt.verify(access_token, config.SECRET, {}, async (err, user) => {
    if (err) return res.status(403).json('Token is not valid!');
    const { name, email, _id } = await User.findById(user.id);
    res.json({ name, email, _id });
  });
};

module.exports = { getUser };
