const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({ ...req.body, password: hash });
  // await newUser.save();
  res.status(201).send('User has been registered');
};

const login = () => {};
module.exports = { register, login };
